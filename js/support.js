(() => {
  const supportType = document.getElementById("support-type");
  const supportApp = document.getElementById("support-app");
  const sendEmailLink = document.getElementById("send-support-email");
  const subjectPreview = document.getElementById("subject-preview");
  const email = "husofttech@gmail.com";

  if (!supportType || !supportApp || !sendEmailLink || !subjectPreview) {
    return;
  }

  const buildMailto = (subject) => {
    const body = "Please include app version and device details.";
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const setEnabled = (enabled) => {
    sendEmailLink.classList.toggle("disabled", !enabled);
    sendEmailLink.setAttribute("aria-disabled", enabled ? "false" : "true");
    sendEmailLink.tabIndex = enabled ? 0 : -1;
  };

  const updateState = () => {
    const typeValue = supportType.value.trim();
    const appValue = supportApp.value.trim();
    const ready = typeValue !== "" && appValue !== "";

    if (ready) {
      const subject = `${typeValue} | ${appValue}`;
      subjectPreview.textContent = subject;
      sendEmailLink.href = buildMailto(subject);
    } else {
      subjectPreview.textContent = "TYPE | APP_NAME";
      sendEmailLink.href = `mailto:${email}`;
    }

    setEnabled(ready);
  };

  supportType.addEventListener("change", updateState);
  supportApp.addEventListener("change", updateState);

  sendEmailLink.addEventListener("click", (event) => {
    const typeValue = supportType.value.trim();
    const appValue = supportApp.value.trim();
    const ready = typeValue !== "" && appValue !== "";

    if (!ready || sendEmailLink.classList.contains("disabled")) {
      event.preventDefault();
      return;
    }

    const subject = `${typeValue} | ${appValue}`;
    const mailtoUrl = buildMailto(subject);
    sendEmailLink.href = mailtoUrl;
    window.location.href = mailtoUrl;
  });

  updateState();
})();
