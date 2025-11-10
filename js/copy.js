// https://dev.to/bibekkakati/how-to-implement-copy-to-clipboard-on-a-website-1p0l

function copyDetails(contentId, copyBtnId) {
    const content = document.getElementById(contentId);
    const copyBtn = document.getElementById(copyBtnId);

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(content.innerText)
            .then(() => alert("Copied to clipboard"))
            .catch(e => alert(e.message));
    });
}

copyDetails("managerEmail", "copyManagerEmail");
copyDetails("managerPassword", "copyManagePassword");
copyDetails("associateEmail", "copyAssociateEmail");
copyDetails("associatePassword", "copyAssociatePassword");



