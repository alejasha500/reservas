


export  function errorHandler(err, req, res, next){
    if(!(err instanceof Error)){
      return res.status(500).json({
        message: "Error desconocido",
        status: 500,
        code: "UNKNOWN_ERROR"
      })
    }

    
      const status = err.status || 500

      res.status(status).json({
        message: err.message,
        status,
        code: err.code || "INTERNAL_SERVER_ERROR",
        details: err.details || null
      })
}



export function notFound(req, res, next) {
    res.status(404).json({
        error: "Not Found",
        message: `La ruta ${req.originalUrl} no existe`
    })
}