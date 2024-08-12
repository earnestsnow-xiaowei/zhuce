const correctPassword = "fhqqDMHWFN05.15"; // 设置访问密码

const saltOptions = {
    "paintx4.0.6": "xiaoWEI05.15PaintX4.0.6",
    "paintx4.0.8": "xiaoWEI05.15PaintX4.0.8",
    "colorfianle2.7.4": "xiaoWEI05.15colorFINALE2.7.4",
    "colorfianle2.8.1": "xiaoWEI05.15colorFINALE2.8.1",
    "colorfianle2.9.0": "xiaoWEI05.15colorFINALE2.9.0",
    "colorfianle2.9.1": "xiaoWEI05.15colorFINALE2.9.1",
    "MotionVFX": "xiaoWEI05.15MotionVFX",
    "neatvideo(达芬奇)": "xiaoWEI05.15NEATVIDEO5.6.5",
    "neatvideo(FCPX)": "xiaoWEI05.15NEATVIDEO5.6.5FCPX",
    "neatvideo(PR)": "xiaoWEI05.15NEATVIDEO5.6.5PR",
    "neatvideo(AE)": "xiaoWEI05.15NEATVIDEO5.6.5AE"
};

function checkPassword() {
    const inputPassword = document.getElementById('passwordInput').value;
    if (inputPassword === correctPassword) {
        document.getElementById('passwordPrompt').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    } else {
        alert('密码错误，请重试');
    }
}

function pasteDeviceCode() {
    navigator.clipboard.readText().then(text => {
        document.getElementById('deviceCode').value = text;
    }).catch(err => {
        alert('无法读取剪贴板内容：' + err);
    });
}

function copyRegistrationCode() {
    const code = document.getElementById('registrationCode').value;
    navigator.clipboard.writeText(code).then(() => {
        alert('注册码已成功复制到剪贴板！');
    }).catch(err => {
        alert('复制失败：' + err);
    });
}

async function generateRegistrationCode() {
    const deviceCode = document.getElementById('deviceCode').value;
    const saltValue = document.getElementById('salt').value;
    const salt = saltOptions[saltValue];
    if (!deviceCode) {
        alert('请先输入设备码');
        return;
    }
    const registrationCode = await sha256(deviceCode + salt);
    document.getElementById('registrationCode').value = registrationCode;
}

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// 禁止右键
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});
