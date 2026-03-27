import janus

# Caso positivo: ECR 100%
janus.expect("event_ok")
janus.trace("event_ok")
janus.evaluate()
print("---")

# Caso negativo: ECR < 100%
janus.expect("event_missing")
# No se registra event_missing
janus.evaluate()
