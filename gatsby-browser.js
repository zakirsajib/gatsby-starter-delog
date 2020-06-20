import 'nprogress/nprogress.css'
import './src/fonts/fonts.css'
import './src/styles/global.scss'

export const onServiceWorkerUpdateReady = () => {
    const answer = window.confirm(
      `This application has been updated. ` +
        `Reload to display the latest version?`
    )

    if (answer === true) {
      window.location.reload()
    }
  }

export const onInitialClientRender = () => {
    setTimeout(function() {
      document.getElementById("___loader").style.display = "none"
  }, 500)
}
