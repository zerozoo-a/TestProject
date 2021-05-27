// import { userInfo } from './userInfo.js';
let isLogIn = false;
let comments = [];
let commentsCnt = 0;
let times = [];
const restrictWords = {
  kr: ['바보', '해삼', '말미잘', '도지코인'],
  eu: ['nerd', 'LaLaLa Love Song', 'dodgeCoin'],
  isRestricted: false,
};
let dummyUserData = {
  sns: null,
  user1: [
    { id: 'naverID', pwd: '1234', comments: [] },
    { id: 'secondID', pwd: '1234', comments: [] },
  ],
  user2: [
    { id: 'kakaoID', pwd: '1111', comments: [] },
    { id: 'kakaoId', pwd: '1111', comments: [] },
  ],
  user3: [{ id: 'facebookID', pwd: '1232', comments: [] }],
  user4: [{ id: 'googleID', pwd: '1231', comments: [] }],
  user5: [{ id: 'twitterID', pwd: '1230', comments: [] }],
};
const navState = () => {
  const logOutBtn = document.createElement('div');
  document.getElementById('NAV').appendChild(logOutBtn);
  isLogIn
    ? (logOutBtn.innerText = 'log out')
    : (logOutBtn.innerText = 'log in');
  logOutBtn.onclick = () => {
    console.log('you have logOut');
    console.log(isLogIn);
    // isLogIn = false;
  };
};
navState();

const logIn = (event) => {
  if (event) event.preventDefault();
  const id = document.getElementById('inputId').value;
  const pwd = document.getElementById('inputPwd').value;
  const sns = dummyUserData.sns;
  const users = dummyUserData;

  const showDown = (nodeEl) => {
    nodeEl.classList.add('invisible');
    nodeEl.classList.remove('up');
  };
  const logInWindowForm = document.getElementById('logInWindowForm');

  const authenticate = (sns, id, pwd) => {
    const checkIdPwd = (userN) => {
      const index = userN.findIndex((findId) => findId.id === id);
      if (index === -1) return;
      return userN[index].id === id && userN[index].pwd === pwd ? true : false;
    };
    switch (sns) {
      case 'naver':
        checkIdPwd(users.user1) ? (isLogIn = true) : (isLogIn = false);
        console.log(isLogIn);
        return isLogIn;
      case 'kakaoTalk':
        checkIdPwd(users.user2) ? (isLogIn = true) : (isLogIn = false);
        return isLogIn;
      case 'faceBook':
        checkIdPwd(users.user3) ? (isLogIn = true) : (isLogIn = false);
        return isLogIn;
      case 'google':
        checkIdPwd(users.user4) ? (isLogIn = true) : (isLogIn = false);
        return isLogIn;
      case 'twitter':
        checkIdPwd(users.user5) ? (isLogIn = true) : (isLogIn = false);
        return isLogIn;
      default:
        return false;
    }
  };
  authenticate(sns, id, pwd)
    ? showDown(logInWindowForm)
    : console.log('ID 혹은 PASS WORD가 맞지 않습니다.');
  //   if (authenticate(sns, id, pwd)) {
  //     navState();
  //   } else {
  //     console.log('ID 혹은 PASS WORD가 맞지 않습니다.');
  //   }
};

const askLogin = (sns) => {
  if (isLogIn) {
    return;
  }
  const showUp = (nodeEl) => {
    nodeEl.classList.remove('invisible');
    nodeEl.classList.add('up');
  };
  const showDown = (nodeEl) => {
    nodeEl.classList.add('invisible');
    nodeEl.classList.remove('up');
  };
  const snsWindow = document.getElementById('snsWindow');
  const logInWindow = document.getElementById('logInWindowForm');
  switch (sns) {
    case 'logIn':
      showUp(snsWindow);
      return;

    case 'naver':
      showDown(snsWindow);
      showUp(logInWindow);
      dummyUserData.sns = 'naver';
      //   logIn(false, 'naver') ? showDown(logInWindow) : alert('XXX');
      return;

    case 'kakaoTalk':
      showDown(snsWindow);
      showUp(logInWindow);
      dummyUserData.sns = 'kakaoTalk';
      return;

    case 'faceBook':
      showDown(snsWindow);
      showUp(logInWindow);
      dummyUserData.sns = 'faceBook';
      return;
    case 'google':
      showDown(snsWindow);
      showUp(logInWindow);
      dummyUserData.sns = 'google';
      return;
    case 'twitter':
      showDown(snsWindow);
      showUp(logInWindow);
      dummyUserData.sns = 'twitter';
      return;
    default:
      return;
  }
};

const restrictSpam = () => {
  const waitSeconds = () => {
    return new Promise((res) => {
      setTimeout(() => {
        res('lock');
      }, 1000);
    });
  };
  const getWait = async () => {
    const result = await waitSeconds();
    document.getElementById('comment').disabled = false;
    document.getElementById('comment').focus();
  };
  const firstCommentTime = new Date();
  times.push(firstCommentTime);
  if (commentsCnt < 1) {
    return;
  }
  if (times[commentsCnt] - times[commentsCnt - 1] < 1100) {
    document.getElementById('comment').disabled = true;
    getWait();
    return;
  }
};
const restrictWord = (comment) => {
  comment = comment.toLowerCase();
  if (comment.slice(-1) === ' ') comment = comment.slice(0, comment.length - 1);
  if (comment.charAt(0) === ' ') comment = comment.slice(1, comment.length);
  const kr = restrictWords.kr;
  let eu = restrictWords.eu;
  eu = eu.map((v) => v.toLowerCase());
  let filteredComment = kr.filter((word) => word.includes(comment));
  filteredComment.push(eu.filter((word) => word.includes(comment)));
  filteredComment = filteredComment.flat();
  restrictWords.isRestricted = false;

  if (filteredComment.length > 0 && filteredComment.join() === comment) {
    alert(`${comment}는 제한된 단어입니다.`);
    restrictWords.isRestricted = true;
    return;
  }
};

// 1. 남의 커멘트는 수정 삭제 불가
//      -
// 2. 댓글에 자기 아이디 보이기

// document.getElementById('comment').focus();
const getComment = (event) => {
  event.preventDefault();

  restrictWord(document.querySelector('#comment').value);
  if (restrictWords.isRestricted) return;
  restrictWords.isRestricted = false;
  restrictSpam();
  comments.push(document.querySelector('#comment').value);
  document.querySelector('#comment').value = '';
  setComment(comments);
  makeDeleteBtn();
  makeModifyBtn(comments);
};

const setComment = (comments) => {
  const list = document.createElement('li');
  const div = document.createElement('div');
  div.innerText = comments[comments.length - 1];
  list.id = ++commentsCnt;
  div.id = commentsCnt + 'comment';
  document.querySelector('#showList').appendChild(list);
  document.getElementById(commentsCnt).appendChild(div);
};

const makeDeleteBtn = () => {
  const id = commentsCnt;
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = 'X';
  deleteBtn.onclick = () => {
    if (window.confirm('댓글을 지우시겠습니까?')) {
      if (document.getElementById(id + 'modifyBtn').innerHTML === '취소') {
        document.getElementById(id + 'modifyForm').remove();
      }
      document.getElementById(id).remove();
    }
  };
  document.getElementById(id).appendChild(deleteBtn);
};

const makeModifyBtn = (comments) => {
  const id = commentsCnt;
  const modifyBtn = document.createElement('button');
  modifyBtn.id = id + 'modifyBtn';
  modifyBtn.innerHTML = '수정';
  modifyBtn.onclick = () => {
    if (modifyBtn.innerHTML === '수정') {
      modifyBtn.innerHTML = '취소';

      comments.map((v, i) => {
        if (parseInt(i + 1) === id) {
          return;
        } else if (
          document
            .getElementById('showList')
            .contains(document.getElementById(i + 1 + 'modifyBtn'))
        ) {
          document.getElementById(i + 1 + 'modifyBtn').innerHTML = '수정';
        } else {
          return;
        }
      });

      const modifyInputComment = document.createElement('input');
      modifyInputComment.id = id + 'modify';
      modifyInputComment.setAttribute('type', 'text');
      modifyInputComment.setAttribute('value', comments[id - 1]);

      const modifySubmitBtn = document.createElement('button');
      modifySubmitBtn.id = id + 'modifySubmit';
      modifySubmitBtn.innerHTML = '등록';

      const modifyForm = document.createElement('form');
      modifyForm.id = id + 'modifyForm';
      modifyForm.appendChild(modifyInputComment);
      modifyForm.appendChild(modifySubmitBtn);
      document.getElementById(id).insertAdjacentElement('afterend', modifyForm);

      const modifySubmitBtnFnc = () => {
        modifyBtn.innerHTML = '수정';
        const modifiedValue = document.getElementById(id + 'modify').value;
        comments[id - 1] = modifiedValue;

        document.getElementById(id + 'comment').innerText = modifiedValue;
        document.getElementById(id + 'modifyForm').remove();
        document.getElementById('comment').focus();
      };

      modifySubmitBtn.onclick = (e) => {
        e.preventDefault();
        modifySubmitBtnFnc();
      };

      comments.map((v, i) => {
        if (parseInt(i + 1) === id) {
          return;
        }
        if (
          document
            .getElementById('showList')
            .contains(document.getElementById(i + 1 + 'modify'))
        ) {
          document.getElementById(i + 1 + 'modifyForm').remove();
        }
      });

      document.getElementById(id + 'modify').focus();
    } else {
      document.getElementById(id + 'modifyForm').remove();
      modifyBtn.innerHTML = '수정';
    }
  };
  document.getElementById(id).appendChild(modifyBtn);
};
