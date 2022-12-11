const socket = io();

let name;


const Dates = new Date(),
H = Dates.getHours(),
M = Dates.getMinutes()


function config(){
    const config_popup = document.createElement('div')
    config_popup.className = 'popup'
    config_popup.innerHTML = `
    <h4>Setting Theme</h4>
    `
    document.querySelector('.msger-chat').appendChild(config_popup)
}

const join = document.querySelector('.join-user')
join.addEventListener("click", (e) => {
    e.preventDefault();
    const user = document.querySelector('.username').value
    if(user == 0){
        return;
    }
    const chat_show = document.querySelector('.msger')
    chat_show.style = "display: flex;"
    const login_hide = document.querySelector('.app > .login_msg')
    login_hide.style = "display: none;"
    name = user;
    socket.emit("user_join", user)
})
socket.on("join", (data) => {
    const join_cv = document.createElement("div")
    join_cv.className = "msg-text"
    join_cv.textContent = data
    document.querySelector('.left-msg > .msg-bubble').appendChild(join_cv)
})
const send = document.querySelector('.msger-send-btn')
send.addEventListener("click", (e) => {
    e.preventDefault();
    const text = document.querySelector('.msger-input')
    RenderMsg("you", {
        name: name,
        msg: text.value
    }, H, M)
    socket.emit("send_chat", {
        name: name,
        msg: text.value
    })
    text.value = ""
})
socket.on("chat_on", (data) => {
    RenderMsg("friends", data, H, M)
})


function RenderMsg(type, msg, H, M) {
    if(type == "you"){
        const right = document.querySelector('.msger-chat')
        let el = document.createElement("div");
            el.setAttribute("class","msg right-msg");
            el.innerHTML = `
                    <div class="msg-info">
                    <div class="msg-time">${H}:${M}</div>
                        <div class="msg-name">You</div>
                    </div>
                    <div class="msg-text-right">${msg.msg}</div>
            `;
            right.appendChild(el)

    } else if(type == "friends") {
        const left = document.querySelector('.msger-chat')
        let el = document.createElement("div");
            el.setAttribute("class","msg left-msg");
            el.innerHTML = `
                    <div class="msg-info">
                        <div class="msg-name">${msg.name}</div>
                        <div class="msg-time">${H}:${M}</div>
                    </div>
                    <div class="msg-text-left">${msg.msg}</div>
            `;
            left.appendChild(el)
    }
}