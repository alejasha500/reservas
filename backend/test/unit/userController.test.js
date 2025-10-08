import { jest } from '@jest/globals'


function createMocksRes(){
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    res.setHeader = jest.fn().mockReturnValue(res)
    return res
}

 

jest.unstable_mockModule('../../src/models/usuarios.model.js', () => ({
      findUserByEmail: jest.fn(),
        createUser: jest.fn(),
        loginUser: jest.fn(),
        getAllUsers: jest.fn()
}))

jest.unstable_mockModule('../../src/config/token.js', () => ({
    generateToken: jest.fn()
}))

   jest.unstable_mockModule('bcrypt', () => {
    const hash = jest.fn()
    const compare = jest.fn()
    
    return {
        default: {
            hash,
            compare
        }
    }
})

jest.unstable_mockModule('../../src/utils/sanitizeUser.js', () => ({
    sanitizeUser: jest.fn()
}))

 let userModel, tokenModule, bcrypt, sanitize, register, login, getUsers

// Cargar los módulos ANTES de los tests
  beforeAll(async () => {
    const bcryptModule = await import('bcrypt')
    bcrypt = bcryptModule.default  // ← Usa el default
    userModel = await import('../../src/models/usuarios.model.js')
    tokenModule = await import('../../src/config/token.js')
    sanitize = await import('../../src/utils/sanitizeUser.js')

    const controller = await import('../../src/controller/usuarios.controller.js')
    register = controller.register
    login = controller.login
    getUsers = controller.getUsers
})

describe('User Controller', () => {
    let req, res, next


     beforeEach(() => {
        req = { body: {}, user: null }
        res = createMocksRes()
        next = jest.fn()
    })
     
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('register', () => {
        it('debe devolver 409 si el email ya existe', async () => {
            req.body = { name: 'juan', email:'juan@example.com', password: 'password123' }

            userModel.findUserByEmail.mockResolvedValue({email: 'juan@example.com'})
            await register(req, res, next)

            expect(userModel.findUserByEmail).toHaveBeenCalledWith('juan@example.com')
            expect(next).toHaveBeenCalled()
            const error = next.mock.calls[0][0]
            expect(error).toBeInstanceOf(Error)
            expect(error.status).toBe(409)
            expect(error.code).toBe('EMAIL_IN_USE')
        })

        it('caso feliz: crea usuario, genera token y devuelve 201', async () => {
            req.body = { name: 'ana', email: 'ana@example.com', password: 'password123' }

            userModel.findUserByEmail.mockResolvedValue(null)
            bcrypt.hash.mockResolvedValue('hashedPassword123')
            userModel.createUser.mockResolvedValue({ id: 1, name: 'ana', email: 'ana@example.com', role: 'user' })
            tokenModule.generateToken.mockReturnValue('fake-jwt-token')
            sanitize.sanitizeUser.mockImplementation(u => {
                const { password, ...rest } = u
                return rest
            })

            await register(req, res, next)

            expect(userModel.findUserByEmail).toHaveBeenCalledWith('ana@example.com')
            expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10)
            expect(userModel.createUser).toHaveBeenCalledWith({
                name: 'ana',
                email: 'ana@example.com',
                password: 'hashedPassword123'
            })
            expect(tokenModule.generateToken).toHaveBeenCalledWith({ id:1, role:'user'})
            expect(res.setHeader).toHaveBeenCalledWith('Authorization', 'Bearer fake-jwt-token')
            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.json).toHaveBeenCalledWith({
                user: { id: 1, name: 'ana', email: 'ana@example.com', role: 'user' },
                token: 'fake-jwt-token'
            })
            expect(next).not.toHaveBeenCalled()    
        })

        it('si createUser falla, debe llamar a next(error)', async () => {
            req.body = { name: 'ana', email: 'ana@example.com', password: 'password123' }

            userModel.findUserByEmail.mockResolvedValue(null)
            bcrypt.hash.mockResolvedValue('hashedPassword123')
            userModel.createUser.mockRejectedValue(new Error('DB error'))

            await register(req, res, next)
            expect(next).toHaveBeenCalledWith(expect.any(Error))
        })
    }) // ← Cierre de describe('register')

    describe('login', () => {
        it('contraseña incorrecta debe devolver 401', async () => {
            req.body = { email: 'existe@example.com', password: 'password123' }

            userModel.loginUser.mockResolvedValue({id: 2, email: 'existe@example.com', password: 'hash'})
            bcrypt.compare.mockResolvedValue(false)
            await login(req, res, next)

            expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hash')
            expect(next).toHaveBeenCalled()
            const error = next.mock.calls[0][0]
            expect(error.status).toBe(401)
            expect(error.code).toBe('INVALID_CREDENTIALS')
        })

          it('email no existe => debe devolver 401', async () => {
                req.body = { email: 'notfound@example.com', password: '123456' }
                userModel.loginUser.mockResolvedValue(null)
    
                await login(req, res, next)

                    expect(next).toHaveBeenCalled()
                    const error = next.mock.calls[0][0]
                      expect(error.status).toBe(401)
                     expect(error.code).toBe('INVALID_CREDENTIALS')
             })

             

        it('caso feliz => debe devolver token', async () => {
            req.body = { email: 'existe@example.com', password: 'password123' }

            const userFromDb = { id: 2, name: 'Pedro', email: 'existe@example.com', password: 'hashedPassword123', role: 'user' }
            userModel.loginUser.mockResolvedValue(userFromDb)
            bcrypt.compare.mockResolvedValue(true)
            tokenModule.generateToken.mockReturnValue('valid-jwt-token')
            sanitize.sanitizeUser.mockReturnValue({ id: 2, name: 'Pedro', email: 'existe@example.com', role: 'user' })

            await login(req, res, next)

            expect(userModel.loginUser).toHaveBeenCalledWith({email:'existe@example.com'})
            expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword123')
            expect(tokenModule.generateToken).toHaveBeenCalledWith({ id:2, role:'user'})
            expect(res.setHeader).toHaveBeenCalledWith('Authorization', 'Bearer valid-jwt-token')
            // ← QUITADO res.status(200) porque tu controller no lo usa
            expect(res.json).toHaveBeenCalledWith({
                user: { id: 2, name: 'Pedro', email: 'existe@example.com', role: 'user' },
                token: 'valid-jwt-token'
            })
        })
    }) // ← Cierre de describe('login')

    describe('getUsers', () => {
        it('no admin debe devolver 403', async () => {
            req.user = { id: 3, role: 'user'}

            await getUsers(req, res, next)

            expect(next).toHaveBeenCalled()
            const error = next.mock.calls[0][0]
            expect(error.status).toBe(403)
            expect(error.code).toBe('ACCESS_DENIED')
        })

        it('admin devuelve users sanitizados', async () => {
            req.user = { id: 1, role: 'admin' }

            const dbUsers = [
                {id:1, name:'a', email: 'a@a.com', password:'h1', role:'admin'},
                {id:2, name:'b', email: 'b@b.com', password:'h2', role:'user'}
            ]

            userModel.getAllUsers.mockResolvedValue(dbUsers)
            sanitize.sanitizeUser.mockImplementation(u => {
                const { password, ...rest } = u
                return rest
            })

            await getUsers(req, res, next)

            expect(userModel.getAllUsers).toHaveBeenCalled()
            expect(res.json).toHaveBeenCalledWith({
                users: [
                    {id:1, name:'a', email: 'a@a.com', role:'admin'},
                    {id:2, name:'b', email: 'b@b.com', role:'user'}
                ]
            })
        })
    })
}) // ← Cierre de describe('User Controller')