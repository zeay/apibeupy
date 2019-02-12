module.exports = function(data) {
    return `<center>
    <h1 style="font-style: normal;font-family: monospace;font-size: 22px;margin: 10px;color: coral;">BeupyTech</h1>
    <p>Thank you for using Beupy Service</p>
    <p>Your Subscriber email is: <spam style="color: red; font-size: 18px;">${data.subscriber}</spam></p>
    <p>BeupyTech<a href="api.beupy.com">&nbsp;&nbsp;API BeupyTech</a></p>
    </center>`
}