import { Box, Button, Container, Grid2, Typography } from "@mui/material"
import Input from "../../components/Inpts"
import { useState } from "react"
import getStore from "../../store"
import { Api } from "../../api"
import { validateLogin } from "../../utils/helpers/validators/login"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const navigate = useNavigate()

  const { controllers } = getStore()

  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({
    email: false,
    password: false,
  })

  const handleField = (field: string, value: string) => {
    if (errors[field]) setErrors((e) => ({ ...e, [field]: false }))

    setForm((f) => ({
      ...f,
      [field]: value,
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      const checkErrors = validateLogin(form)

      if (!checkErrors.hasErrors) {
        const req = await Api.auth.login(form)

        if (req.ok) {
          controllers.auth.setData({
            accessToken: req.data.accessToken,
            refreshToken: req.data.refreshToken,
          })

          localStorage.setItem("accessToken", req.data.accessToken)
          localStorage.setItem("refreshToken", req.data.refreshToken)

          controllers.user.setData(req.data.user)
          navigate("/dashboard")
        } else {
          controllers.feedback.setData({
            message: req.error.message,
            state: "error",
            visible: true,
          })
        }
      } else {
        let newErrors: any = {}
        checkErrors.fields.forEach((field) => (newErrors[field] = true))
        setErrors(newErrors)
      }
    } catch (error) {
      controllers.feedback.setData({
        message: "Houve um erro ao fazer o login. Tente novamente mais tarde.",
        state: "alert",
        visible: true,
      })
    }

    setLoading(false)
  }

  return (
    <Box
      sx={{
        width: "100vw",
        backgroundColor: (theme) => theme.palette.neutral[800],
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          bgcolor: (theme) => theme.palette.neutral[800],
        }}
      >
        <Box
          flex={1}
          minHeight={"100vh"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography
            fontFamily={"Mr De Haviland"}
            fontStyle={"cursive"}
            fontSize={64}
            sx={{
              color: (theme) => theme.palette.neutral[200],
            }}
          >
            Kena Pingentes
          </Typography>
          <Typography
            fontSize={20}
            fontWeight={600}
            sx={{
              color: (theme) => theme.palette.orange[400],
            }}
          >
            Admin
          </Typography>
        </Box>

        <Grid2
          padding={"48px 32px"}
          maxWidth={420}
          width={"100%"}
          container
          direction={"column"}
          alignItems={"center"}
          gap={4}
          boxShadow={"0 4px 4px 0 rgba(0, 0, 0, 0.15)"}
          borderRadius={"15px"}
        >
          <Typography
            fontSize={24}
            fontWeight={600}
            width={"fit-content"}
            sx={{
              color: (theme) => theme.palette.orange[400],
            }}
          >
            LOGIN
          </Typography>

          <form style={{ width: "100%" }}>
            <Grid2
              container
              direction={"column"}
              alignItems={"center"}
              sx={{
                width: "100%",
                gap: "48px",
              }}
            >
              <Grid2
                container
                direction={"column"}
                sx={{ gap: 3 }}
                width={"100%"}
              >
                <Input.Default
                  label="Email"
                  value={form.email}
                  error={{
                    has: errors.email,
                    message: "Digite um email válido.",
                  }}
                  onChange={handleField}
                  inputType="email"
                  field={"email"}
                />

                <Input.Default
                  label="Senha"
                  value={form.password}
                  error={{
                    has: errors.password,
                    message: "Senha incorreta.",
                  }}
                  onChange={handleField}
                  inputType={"password"}
                  field={"password"}
                  onEnter={handleSubmit}
                />
              </Grid2>

              <Button
                type="submit"
                loading={loading}
                onClick={handleSubmit}
                size="medium"
                variant="contained"
                sx={{
                  backgroundColor: (theme) => theme.palette.green[460],
                  color: (theme) => theme.palette.neutral[900],
                  width: 148,
                  padding: "8px",
                }}
              >
                Entrar
              </Button>
            </Grid2>
          </form>
        </Grid2>
      </Container>
    </Box>
  )
}

export default LoginPage
