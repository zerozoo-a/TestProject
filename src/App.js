let comments = [];
let commentsCnt = 0;
let times = [];
let isSpam = false;

document.getElementById('comment').focus();
const getComment = (event) => {
  event.preventDefault();
  if (isSpam) {
    return;
  }

  comments.push(document.querySelector('#comment').value);
  document.querySelector('#comment').value = '';
  setComment(comments);
  makeDeleteBtn();
  makeModifyBtn(comments);
};
// const timeStamp = () => {
//   let time = new Date();
//   let seconds = time.getSeconds();
//   times.push({
//     time: time,
//     seconds: seconds,
//   });
//   console.log(commentsCnt);
// };

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
      //   comments[id]
      //   document.getElementById(id + 'modifyBtn').innerHTML = '수정';
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

      console.log(comments);
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
        console.log(comments[id - 1]);
        comments[id - 1] = modifiedValue;

        document.getElementById(id + 'comment').innerText = modifiedValue;
        // if (modifyForm) modifyForm.remove();
        // document.getElementById(id + 'modify').remove();
        // document.getElementById(id + 'modifySubmit').remove();
        document.getElementById(id + 'modifyForm').remove();
        document.getElementById('comment').focus();
      };

      modifySubmitBtn.onclick = () => {
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
