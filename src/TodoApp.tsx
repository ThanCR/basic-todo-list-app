import { Footer } from "./components/layout/Footer"
import { Header } from "./components/layout/Header"
import { Container } from "./components/layout/Container"
import { Toaster } from "./components/ui/sonner"

export const TodoApp = () => {
  return (
    <div className="bg-[url(./static/bg-image-main.jpg)] bg-no-repeat bg-center bg-cover h-dvh ">
      <Toaster/>
      <Header />
      <Container />
      <Footer />
    </div>
  )
}
