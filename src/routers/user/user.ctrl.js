// 회원 관리에 jwt 토큰을 사용해야 할 것 같습니다.
const db = require('../../config/db.js');
const Joi = require('joi');

exports.register = (req, res) => { // 회원 가입
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        pw: Joi.string().required(),
        nickname: Joi.string().required(),
        sex: Joi.string().valid('M', 'F'),
        address: Joi.string(),
        birthdate: Joi.date(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400);
        res.send(result.error);
        return;
    }

    const { email, pw, nickname, birthdate, sex, address } = req.body;
    db.query(`SELECT email FROM user WHERE email = ?`, [req.body.email], (err, db_email) => {
        if (err) { return res.status(500).send('email broke!'.err); }
        if (db_email[0] != undefined) {
            return res.status(409).send('이미 존재하는 이메일입니다.');
        }
        db.query(`SELECT nickname FROM user WHERE nickname = ?`, [req.body.nickname], (err, db_nickname) => {
            if (err) { return res.status(500).send('nickname broke!'.err); }
            if (db_nickname[0] != undefined) {
                return res.status(409).send('이미 존재하는 닉네임입니다.');
            }
            // 나중에는 암호와 모듈도 사용해야합니다. 비밀번호를 평문으로 저장하면 법적인 문제가...
			db.query(`INSERT INTO user (email, pw, nickname, birthdate, sex, address, created_date) VALUES(?,?,?,?,?,?,NOW())`, [email, pw, nickname, birthdate, sex, address], (err) => {
				if (err) return res.status(500).send('insert broke!'.err);
				res.redirect('/');
			});
    	});
    });
    // 추후에 리팩토링 하면 더 깔끔하게 만들 수 있습니다. callback -> promise -> async/await 순으로 리팩토링 됩니다.
}

exports.edit = (req, res) => {
    // 회원 정보 수정 구현
    console.log('login user');
    console.log(req);
    res.send('login');
}
exports.login = (req, res) => { // 로그인, 세션에 로그인 정보를 저장
    // todo
    // 1. email, password 값 존재 확인
    // 2. DB에 계정이 존재하는 검사
    // 3. 계정이 존재한다면 password와 함께 다시 검색
    // 4. 로그인 완료 토큰 발급
    // 5. / 로 리다이렉션
    console.log('login user');
    console.log(req);
    res.send('login');
}
exports.logout = (req, res) => { // 로그아웃, 세션 파괴
    // todo
    // 1. email, password 값 존재 확인
    // 2. / 로 리다이렉션
    console.log('logout user');
    console.log(req);
    res.send('logout');
}
exports.delete = (req, res) => { // 계정 삭제
    console.log(req);
    console.log('delete account');
    res.send('delete account');
}
