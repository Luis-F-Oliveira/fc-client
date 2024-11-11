import '@/app/error.css'

export default function Page() {
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className="scene">
        <div className="overlay"></div>
        <div className="overlay"></div>
        <div className="overlay"></div>
        <div className="overlay"></div>
        <span className="bg-403">403</span>
        <div className="text">
          <span className="hero-text"></span>
          <span className="msg">Não podemos deixar <span>você</span> entrar.</span>
          <span className="support">
            <span>Não esperado?</span>
            <a href="#">Entre em contrato.</a>
          </span>
        </div>
      </div>
    </div>
  )
}
