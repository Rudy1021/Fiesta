from flask import Flask, render_template, request, redirect, url_for, send_file
from flask import session, make_response, Response
import datetime
import os

app = Flask(__name__)
SECRET_KEY = os.urandom(32)
app.config['SECRET_KEY'] = SECRET_KEY


@app.before_request
def make_session_permanet():
    session.permanet = True
    app.permanet_session_lifetime = datetime.timedelta(minutes=10)


@app.route('/.well-known/pki-validation/<id>')
def acme_challenge(id):
    string = 'CA458801FED4ED705BA89934A14069D70A6F3CC9557739C32174B2F46974187B'
    return string + "\ncomodoca.com\n23df8aa640cb466"


# index
@app.route("/")
def index():
    return render_template('index.html')


@app.route("/Group")
def Group():
    return render_template('Group.html')


@app.route('/CreateEvent')
def CreateEvent():
    return render_template("CreateEvent.html")


@app.route('/MyProfile', methods=['GET'])
def MyProfile():
    return render_template("MyProfile.html")


@app.route('/MyTicket', methods=['GET'])
def MyTicket():
    return render_template("MyTicket.html")


@app.route('/login', methods=['GET'])
def logintest():
    return render_template("login.html")


@app.route("/check")
def check():
    return render_template("check.html")


@app.route('/signup')
def signup():
    return render_template("signup.html")


@app.route('/forgotpassword/<id>')
def forgotpassword(id):
    return render_template("forgotpassword.html")


@app.route('/Mailsuccess/<id>')
def Mailsuccess(id):
    return render_template("successMail.html")


@app.route('/font')
def Font():
    return


@app.route('/QRcode')
def QRcode():
    return render_template("QRcode.html")


@app.route('/Activity')
def Activity():
    return render_template("Activity.html")


@app.route('/Activity/<act_Name>/', methods=['GET'])
def showAct(act_Name):
    return render_template("showAct.html", act_Name=act_Name)


@app.route('/editActivity/<act_Name>/', methods=['GET'])
def editAct(act_Name):
    return render_template("editAct.html", act_Name=act_Name)


@app.route('/dashboard')
def dashboard():
    return render_template("dashboard.html")


@app.route('/dashboard/model')
def dashboardId():
    return render_template("dashboard-mod.html")


@app.route("/apple-app-site-association")
def apple():
    response = make_response(
        send_file(".well-known/apple-app-site-association",
                  mimetype='application/pkcs7-mime'))
    return response


@app.route("/policy")
def private():
    return render_template("private.html")


@app.route("/advertising")
def advertising():
    return render_template("advertising.html")


@app.route("/test")
def test():
    return render_template("test.html")


@app.route("/tag")
def tag():
    return render_template("tag.html")


@app.route("/activity-new")
def actnew():
    return render_template("activity-new.html")


@app.route("/create-new")
def createnew():
    return render_template("create-new.html")


@app.route("/review/<actId>")
def newreview(actId):
    return render_template("review.html", actId=actId)


@app.route('/dashboard/survey')
def survey():
    return render_template("survey.html")


@app.route('/index-new')
def indexNew():
    return render_template("index-new.html")


@app.route('/interest')
def interest():
    return render_template("interest.html")


@app.route('/buy-ticket')
def BuyTicket():
    return render_template("buy-ticket.html")


@app.route('/myticket-new')
def MyTicketNew():
    return render_template("base-nav-bg.html")


@app.route('/myfavorites')
def myfavorites():
    return render_template("base-nav-bg.html")


@app.route('/favoritesFile')
def favoritesFile():
    return render_template("MyFavorites.html")


@app.route('/ticketFile')
def ticketFile():
    return render_template("MyTicket-new.html")


# Run App
if __name__ == "__main__":
    app.jinja_env.auto_reload = True
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True,
    )
