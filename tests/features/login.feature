#language: es
Característica: Funcionalidad de inicio de sesión

  Escenario: Inicio de sesión exitoso con usuario estándar
    Dado que Michael está en la página de inicio de sesión
    Cuando inicia sesión con usuario "standard_user" y contraseña "secret_sauce"
    Entonces debería ver la página de Productos

  Escenario: Inicio de sesión fallido con usuario bloqueado
    Dado que Michael está en la página de inicio de sesión
    Cuando inicia sesión con usuario "locked_out_user" y contraseña "secret_sauce"
    Entonces debería ver el mensaje de error

  Escenario: Inicio de sesión fallido por usuario incorrecto
    Dado que Michael está en la página de inicio de sesión
    Cuando inicia sesión con usuario "test" y contraseña "qwerty"
    Entonces debería ver el mensaje de error de usuario incorrecto
