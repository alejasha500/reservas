import { useEffect, useRef, useState } from 'react'
// FadeInSection.jsx CON PROP PARA TIPO DE ANIMACIÓN

export default function FadeInSection({ children}) {
    const ref = useRef()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
         const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            {threshold: 0.5}
         )
         if(ref.current) observer.observe(ref.current)
         return () => observer.disconnect()
    }, [])

    return (
           <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
    )
}