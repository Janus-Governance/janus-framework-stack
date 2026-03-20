# Clarity Over Cleverness — v1.1

**Nombre:**  
Clarity Over Cleverness

**Descripción:**  
Este protocolo establece que, en la Frontend Product Layer, la claridad en la comunicación y en la interacción tiene prioridad sobre soluciones ingeniosas, optimizaciones estéticas o implementaciones “elegantes” que dificulten la comprensión del usuario o del propio sistema.

**Problema que resuelve:**  
Evita interfaces confusas, microcopys ambiguos, flujos poco evidentes o decisiones de diseño/código que priorizan originalidad o sofisticación por sobre la comprensión. Reduce la carga cognitiva del usuario y del equipo, evitando que lo “inteligente” complique lo “usable”.

## Operational definition

- **Clear interaction:**  
  An interface behavior that can be understood immediately without interpretation or prior knowledge.

- **Clever interaction:**  
  An interface behavior that prioritizes novelty, surprise, or aesthetic over immediate comprehension.

- **Cognitive load:**  
  The mental effort required for a user to understand and interact with the system.

**Regla:**  
Ante múltiples formas de resolver una interacción, mensaje o componente, se debe elegir siempre la opción más clara, explícita y predecible, incluso si resulta menos “elegante”, menos compacta o más redundante desde el punto de vista técnico o visual.

**Definición operativa:**  
- “Clever” se define como cualquier solución que requiere conocimiento previo no evidente para ser comprendida por un revisor o usuario en su primer contacto con la interfaz o el código.  
- La claridad se evalúa desde la perspectiva de un usuario o revisor de primera vez, sin conocimiento previo del sistema.

**Aplicación práctica:**  
Si un botón puede tener un ícono abstracto o un texto explícito, se prioriza el texto. Si un flujo puede comprimirse en menos pasos pero se vuelve menos entendible, se mantiene el flujo más largo pero claro. En código frontend, se priorizan nombres descriptivos y estructuras legibles por sobre abreviaciones o patrones excesivamente sofisticados. En microcopy, se evita ambigüedad, ironía o creatividad que afecte la comprensión inmediata.

**Notas:**  
- Este protocolo aplica únicamente dentro de la Frontend Product Layer definida en la arquitectura Janus.  
- La claridad se valida mediante revisión humana centrada en comprensión inmediata, no en criterios estéticos o de optimización técnica.  
- Este protocolo complementa “User Surface First”, asegurando no solo prioridad de superficie sino también calidad de comprensión.  

**Estado:**  
final
