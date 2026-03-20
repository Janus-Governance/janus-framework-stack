# User Surface First — v1.1

**Name:**  
User Surface First

**Description:**  
This protocol states that, within the Frontend Product Layer, the primary priority of any intervention must be the visible and usable surface of the product for the end user. Before optimizing internal structures, abstractions, or technical improvements that are not perceptible, it must be verified that the concrete user experience is clear, understandable, and functional.

**Problem it solves:**  
It prevents development from drifting toward internal logic, refactors, or technically correct decisions in the abstract that are disconnected from the visible value of the product. It reduces the risk of building a frontend that is technically clean but confusing or incomplete from a real user perspective.

**Rule:**  
In frontend/product decisions, priority is given to what directly impacts the user’s visible, understandable, and usable experience. No internal improvement should displace a surface improvement if that surface issue affects comprehension, navigation, readability, interaction, or perception.

**Practical application:**  
If a screen works technically but the user does not understand what to do, fix visual hierarchy, text, states, calls to action, or interaction flow first. If there is a tradeoff between refactoring internal components or resolving a visible issue in layout, feedback, clarity, or accessibility, resolve the visible issue first. In reviews, the first criterion is not whether the code improved but whether the product surface became clearer and more usable.

**Notes:**  
- This protocol applies only within the Frontend Product Layer as defined in the Janus architecture.  
- Surface improvement is validated through human review of the end-user interaction path, not through technical metrics alone.  
- This protocol formalizes user-centered priority within the Janus framework context. It is compatible with user-centered design approaches but operationally defined for this framework.  
- This protocol was externally validated through an AI-assisted governance review process.  

**Status:**  
final
