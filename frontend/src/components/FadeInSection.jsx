import { useEffect, useRef, useState } from 'react'
// FadeInSection.jsx CON PROP PARA TIPO DE ANIMACIÓN

export default function FadeInSection({ children, type = 'fadeUp' }) {
    const ref = useRef()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
         const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            {threshold: 0.3}
         )
         if(ref.current) observer.observe(ref.current)
         return () => observer.disconnect()
    }, [])

    const animations = {
        fadeUp: visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        fadeLeft: visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20',
        fadeRight: visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20',
        zoom: visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
    }

    return (
        <div ref={ref} className={`transition-all duration-1000 transform ${animations[type]}`}>
          {children}  
        </div>
    )
}