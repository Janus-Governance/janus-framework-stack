import janus

@janus.governed
def my_function():
    janus.trace("hello", {"msg": "world"})

janus.expect("missing_event")
my_function()
janus.report()
janus.evaluate()
janus.human_decision("CONFIRMED", "missing_event no ocurrió")
