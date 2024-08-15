// server.js
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const app = express();
const port = 3000;

// 设置解析 JSON 请求体
app.use(bodyParser.json());
app.use(express.static('public')); // 提供静态文件服务

const PASSWORD = 'fhqqDMHWFN05.15'; // 服务器端存储的密码
const SALTS = {
    'paintx4.0.6': 'xiaoWEI05.15PaintX4.0.6',
    'paintx4.0.8': 'xiaoWEI05.15PaintX4.0.8',
    'colorfianle2.7.4': 'xiaoWEI05.15colorFINALE2.7.4',
    'colorfianle2.8.1': 'xiaoWEI05.15colorFINALE2.8.1',
    'colorfianle2.9.0': 'xiaoWEI05.15colorFINALE2.9.0',
    'colorfianle2.9.1': 'xiaoweicolorfinale2.9.1',
    'MotionVFX': 'xiaoWEI05.15MotionVFX',
    'neatvideo(达芬奇)': 'xiaoWEI05.15NEATVIDEO5.6.5',
    'neatvideo(FCPX)': 'xiaoWEI05.15NEATVIDEO5.6.5FCPX',
    'neatvideo(PR)': 'xiaoWEI05.15NEATVIDEO5.6.5PR',
    'neatvideo(AE)': 'xiaoWEI05.15NEATVIDEO5.6.5AE'
};

app.post('/verify-password', (req, res) => {
    const { password } = req.body;
    if (password === PASSWORD) {
        res.status(200).send({ success: true });
    } else {
        res.status(401).send({ success: false, message: '密码错误' });
    }
});

app.post('/generate-registration-code', (req, res) => {
    const { deviceCode, saltKey } = req.body;
    const salt = SALTS[saltKey];
    if (!deviceCode || !salt) {
        return res.status(400).send({ success: false, message: '设备码或盐值无效' });
    }
    const registrationCode = crypto.createHash('sha256').update(deviceCode + salt).digest('hex');
    res.status(200).send({ success: true, registrationCode });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
