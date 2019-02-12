module.exports = function(data) {
    return `<center>
    <h1 style="font-style: normal;font-family: monospace;font-size: 22px;margin: 10px;color: coral">BeupyTech</h1>
    <p style="color: black">Thank you for using Beupy Service</p>
    <p style="color: black">User Name is: <span style="color: red; font-size: 18px">${data.userName}</span></p>
    <p style="color: black">User Email is: <span style="color: red; font-size: 18px">${data.userEmail}</span></p>
    <p style="color: black">Subject is: <span style="color: red; font-size: 18px">${data.subject}</span></p>
    <p style="color: black">Message is: <span style="color: red; font-size: 18px">${data.message}</span></p>
    <p style="color: black">BeupyTech&nbsp;&nbsp;<a href="http://api.beupy.com">API BeupyTech</a></p>
    </center>`
}