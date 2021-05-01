import { ToastMessage } from "rimble-ui";

export const processingToast = (hash) => {
  window.toastProvider.addMessage("Transaction started...", {
    secondaryMessage: "Check progress on Etherscan",
    actionHref: "https://mainnet.etherscan.io/tx/" + hash,
    actionText: "Check",
    variant: "processing"
  })
}

export const successToast = (message) => {
  window.toastProvider.addMessage(message, {
    variant: "success"
  })
}

export const failedToast = () => {
  window.toastProvider.addMessage("Transaction failed...", {
    secondaryMessage: "Try again",
    variant: "failure"
  })
}
