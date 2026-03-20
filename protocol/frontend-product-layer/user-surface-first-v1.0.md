# User Surface First — v1.0

**Nombre:**  
User Surface First

**Descripción:**  
Este protocolo establece que, en la capa Frontend Product Layer, la prioridad principal de cualquier intervención debe ser la superficie visible y usable del producto por parte del usuario final. Antes de optimizar estructuras internas, abstracciones o mejoras técnicas no perceptibles, se debe verificar si la experiencia concreta de uso está resuelta, clara y funcional.

**Problema que resuelve:**  
Evita que el desarrollo se desvíe hacia lógica interna, refactors o decisiones técnicas correctas en abstracto pero desconectadas del valor visible del producto. Reduce el riesgo de construir un frontend técnicamente prolijo pero pobre, confuso o incompleto en su experiencia real.

**Regla:**  
En decisiones de desarrollo de frontend/producto, tiene prioridad aquello que impacta directamente en la experiencia visible, entendible y usable del usuario final. Ninguna mejora interna debe desplazar una corrección o mejora de superficie si esta afecta comprensión, navegación, lectura, interacción o percepción del producto.

**Aplicación práctica:**  
Si una pantalla funciona técnicamente pero el usuario no entiende qué hacer, primero se corrige jerarquía visual, textos, estados, llamados a la acción o flujo de interacción. Si existe una discusión entre refactorizar componentes internos o resolver un problema visible de layout, feedback, claridad o accesibilidad básica, se resuelve primero lo visible. En revisiones de avance, el criterio inicial no es “si el código quedó mejor” sino “si la superficie del producto quedó más clara, usable y sólida”.

**Notas:**  
- Este protocolo aplica únicamente dentro de la Frontend Product Layer definida en la arquitectura Janus. No aplica a backend, infraestructura ni capas de gobernanza.  
- La mejora de superficie se valida mediante revisión humana del flujo de interacción del usuario final, no mediante métricas técnicas aisladas.  
- Este protocolo formaliza la prioridad centrada en el usuario dentro del contexto Janus. Es compatible con enfoques de diseño centrado en el usuario, pero se define operativamente para este framework.
- This protocol was externally validated through an AI-assisted governance review process.

**Estado:**  
final
