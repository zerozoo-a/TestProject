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
    { sns: 'naver', loggedInUser: null },
    { id: 'q', pwd: '1', comments: [] },
    { id: 'secondID', pwd: '1234', comments: [] },
  ],
  user2: [
    { sns: 'kakao', loggedInUser: null },
    { id: 'kakaoID', pwd: '1111', comments: [] },
    { id: 'kakaoId', pwd: '1111', comments: [] },
  ],
  user3: [
    { sns: 'faceBook', loggedInUser: null },
    { id: 'facebookID', pwd: '1232', comments: [] },
  ],
  user4: [
    { sns: 'google', loggedInUser: null },
    { id: 'googleID', pwd: '1231', comments: [] },
  ],
  user5: [
    { sns: 'twitter', loggedInUser: null },
    { id: 'twitterID', pwd: '1230', comments: [] },
  ],
};
const navState = () => {
  const logOutBtn = document.getElementById('logInState');
  const showUp = (nodeEl) => {
    nodeEl.classList.remove('invisible');
    nodeEl.classList.add('up');
  };
  if (isLogIn) {
    logOutBtn.innerText = '로그아웃';
    commentState();
  } else {
    logOutBtn.innerText = '로그인';
  }
  logOutBtn.onclick = () => {
    if (!isLogIn) {
      showUp(document.getElementById('snsWindow'));
    } else {
      isLogIn = false;
      navState();
      commentState();
    }
  };
};
navState();

const commentState = () => {
  let buttons = document.getElementsByTagName('button');
  if (buttons.length === 0) return;
  const spreadButtons = [...buttons];
  if (!isLogIn) {
    spreadButtons.forEach((button) => (button.style.display = 'none'));
    return;
  }
  let commentStateLoggedInUser = null;
  let commentStateComments = null;
  const findLoggedInUser = (sns, user) => {
    const index = sns.findIndex((findId) => findId.id === user);
    commentStateComments = sns[index].comments;
    commentStateLoggedInUser = sns[0].loggedInUser;
  };
  switch (dummyUserData.sns) {
    case 'naver':
      findLoggedInUser(
        dummyUserData.user1,
        dummyUserData.user1[0].loggedInUser
      );
      break;
    case 'kakaoTalk':
      findLoggedInUser(
        dummyUserData.user2,
        dummyUserData.user2[0].loggedInUser
      );
      break;

    case 'faceBook':
      findLoggedInUser(
        dummyUserData.user3,
        dummyUserData.user3[0].loggedInUser
      );
      break;

    case 'google':
      findLoggedInUser(
        dummyUserData.user4,
        dummyUserData.user4[0].loggedInUser
      );
      break;
    case 'twitter':
      findLoggedInUser(
        dummyUserData.user5,
        dummyUserData.user5[0].loggedInUser
      );
      break;

    default:
      return;
  }

  spreadButtons.forEach((button) => {
    if (button.dataset.owner !== commentStateLoggedInUser) {
      button.style.display = 'none';
    } else {
      button.style.display = 'inline';
    }
  });
};
commentState();
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
        if (users.user1) users.user1[0].loggedInUser = id;
        return isLogIn;
      case 'kakaoTalk':
        checkIdPwd(users.user2) ? (isLogIn = true) : (isLogIn = false);
        if (users.user2) users.user2[0].loggedInUser = id;
        return isLogIn;
      case 'faceBook':
        checkIdPwd(users.user3) ? (isLogIn = true) : (isLogIn = false);
        if (users.user3) users.user3[0].loggedInUser = id;
        return isLogIn;
      case 'google':
        checkIdPwd(users.user4) ? (isLogIn = true) : (isLogIn = false);
        if (users.user4) users.user4[0].loggedInUser = id;
        return isLogIn;
      case 'twitter':
        checkIdPwd(users.user5) ? (isLogIn = true) : (isLogIn = false);
        if (users.user5) users.user5[0].loggedInUser = id;
        return isLogIn;
      default:
        return false;
    }
  };
  if (authenticate(sns, id, pwd)) {
    navState();
    commentState();
    showDown(logInWindowForm);
  } else {
    alert('ID 혹은 PASS WORD가 맞지 않습니다.');
  }
};

// commentState();

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

// document.getElementById('comment').focus();
const getComment = (event) => {
  event.preventDefault();
  if (!isLogIn) return;
  let comments = [];
  let loggedInUser = null;
  const findLoggedInUser = (sns, user) => {
    const index = sns.findIndex((findId) => findId.id === user);
    comments = sns[index].comments;
    loggedInUser = sns[0].loggedInUser;
  };
  switch (dummyUserData.sns) {
    case 'naver':
      findLoggedInUser(
        dummyUserData.user1,
        dummyUserData.user1[0].loggedInUser
      );
      break;
    case 'kakaoTalk':
      findLoggedInUser(
        dummyUserData.user2,
        dummyUserData.user2[0].loggedInUser
      );
      break;

    case 'faceBook':
      findLoggedInUser(
        dummyUserData.user3,
        dummyUserData.user3[0].loggedInUser
      );
      break;

    case 'google':
      findLoggedInUser(
        dummyUserData.user4,
        dummyUserData.user4[0].loggedInUser
      );
      break;
    case 'twitter':
      findLoggedInUser(
        dummyUserData.user5,
        dummyUserData.user5[0].loggedInUser
      );
      break;

    default:
      return;
  }
  restrictWord(document.querySelector('#comment').value);
  if (restrictWords.isRestricted) return;
  restrictWords.isRestricted = false;
  restrictSpam();
  comments.push(document.querySelector('#comment').value);
  document.querySelector('#comment').value = '';
  setComment(comments);
  makeDeleteBtn(loggedInUser);
  makeModifyBtn(comments, loggedInUser);
  commentState();
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

const makeDeleteBtn = (loggedInUser) => {
  const id = commentsCnt;
  const deleteBtn = document.createElement('button');
  deleteBtn.dataset.owner = loggedInUser;
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

const makeModifyBtn = (comments, loggedInUser) => {
  const id = commentsCnt;
  const modifyBtn = document.createElement('button');
  modifyBtn.dataset.owner = loggedInUser;
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
