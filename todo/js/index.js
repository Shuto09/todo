'use strict';

// 以下対応お願いいたしますー
// ・タスクを入力し登録ボタンを押下したら、下のSample Taskのフォーマットで、ulタグに追加される。
// ・チェックボックスにチェックを入れたら、Deleteボタンを活性にする


// 1回目のアクセスかどうか
if (localStorage.getItem('Key') === null) {
    const sample = `<li class="list-group-item d-flex justify-content-between align-items-center">
    <span><input type="checkbox" class="me-3" onchange="check(event)">Sample Task</span>
    <div>
        <button class="btn btn-outline-danger hidden" onclick="edit_f(event)">終了</button>
        <button class="btn btn-outline-info" onclick="edit(event)">編集</button>
        <button class="btn btn-outline-secondary" disabled  onclick="del(this)"><i class="fas fa-trash-alt fa-lg"></i></button>
    </div>
    </li>`;
    document.getElementById('contents').insertAdjacentHTML('beforeend', sample);
} else {
    // 2回目以降の場合
    var jsonObj = localStorage.getItem('Key');
    var jsObj = JSON.parse(jsonObj);
    var obj_cnt = Object.keys(jsObj).length;
    if (obj_cnt === 0) {
        const sample = `<li class="list-group-item d-flex justify-content-between align-items-center">
    <span><input type="checkbox" class="me-3" onchange="check(event)">Sample Task</span>
    <div>
        <button class="btn btn-outline-danger hidden" onclick="edit_f(event)">終了</button>
        <button class="btn btn-outline-info" onclick="edit(event)">編集</button>
        <button class="btn btn-outline-secondary" disabled  onclick="del(this)"><i class="fas fa-trash-alt fa-lg"></i></button>
    </div>
    </li>`;
        document.getElementById('contents').insertAdjacentHTML('beforeend', sample);
    } else {
        for (let i = 0; i < obj_cnt; i++) {
            var li_obj = jsObj[`${i}`];
            // console.log(li_obj);
            document.getElementById('contents').insertAdjacentHTML('beforeend', li_obj);
        }
    }
}

const bgcolor = ['#ffa8a8', '#ffa8d3', '#ffa8ff', '#d3a8ff', '#a8a8ff', '#a8d3ff', '#a8ffff', '#a8ffd3', '#a8ffa8', '#d3ffa8', '#ffffa8']; //11色
const ftcolor = ['#ff0000', '#ff007f', '#ff00ff', '#7f00ff', '#0000ff', '#007fff', '#009bbf', '#00bb85', '#009944', '#6cbb5a', '#ee7b1a']; //11色
let cnt = 0;
document.getElementById('form').onsubmit = function (event) {
    event.preventDefault();
    console.log($("#item").val());
    const to_do = document.getElementById('form').item.value;
    if (to_do === '') {
        console.log('なにもないよ');
        $(".alert-danger").fadeIn(1500);
        $(".alert-danger").fadeOut(3500);
        // $(".alert-danger").removeClass('hidden');
    } else {
        console.log('elseだよ');
        console.log(cnt);
        // $(".alert-danger").addClass('hidden');
        const li = `<li class="list-group-item d-flex justify-content-between align-items-center" style="background-color:${bgcolor[cnt]};">
        <span style="color:${ftcolor[cnt]};"><input type="checkbox" class="me-3" onchange="check(event)">${to_do}</span>
        <div>
            <button class="btn btn-outline-danger hidden" onclick="edit_f(event)">終了</button>
            <button class="btn btn-outline-info" onclick="edit(event)">編集</button>
            <button class="btn btn-outline-secondary" disabled  onclick="del(this)"><i class="fas fa-trash-alt fa-lg"></i></button>
        </div></li>`;
        document.getElementById('contents').insertAdjacentHTML('beforeend', li);
        ////登録後フォーム内削除
        // console.log('クリックされました');
        $("#item").val('');
        // document.getElementById("item").value = '';
        if (cnt < 11) {  //ここを「１１」にすることで配列「１１」は存在しておらず、Sampleと同じ色をだせるので１１にしている
            cnt += 1;
        } else {
            cnt = 0;
        }

        // var li_cnt = $('#contents li').length;
        // console.log(li_cnt);
        // var obj = {};
        // for (let i = 1; i < li_cnt + 1; i++) {
        //     $('#contents li').eq(i - 1).attr('id', `${i}`);
        //     // console.log(document.getElementById(`${i}`).outerHTML);
        //     obj[i] = document.getElementById(`${i}`).outerHTML;
        //     // console.log(obj);
        // }
        // var obj = JSON.stringify(obj);
        // localStorage.setItem('Key', obj);

        var li_cnt = $('#contents li').length;
        // console.log(li_cnt);
        var arr = [];
        for (let i = 0; i < li_cnt; i++) {
            // console.log($('#contents li').eq(i).prop("outerHTML"));
            arr[i] = $('#contents li').eq(i).prop("outerHTML");
            // console.log(arr);
        }
        var arr = JSON.stringify(arr);
        localStorage.setItem('Key', arr);

    }
}



function check(event) {
    console.log(event);//input要素
    var parent = event.target.parentNode;//sapn
    console.log('parent', parent);
    // var next = parent.nextElementSibling;
    // console.log('next', next);
    var next = parent.nextElementSibling;//div
    console.log('next', next);
    var child = next.lastElementChild;//btn
    console.log('child', child);

    console.log(event.target.checked);
    if (event.target.checked) {
        child.disabled = false;
    } else {
        child.disabled = true;
    }
}

function edit(event) {
    console.log(event);//btn
    var sister = event.target.previousElementSibling;//終了btn
    console.log('sister', sister);
    var sister2 = event.target.nextElementSibling;//del.btn
    console.log('sister2', sister2);
    $(sister).removeClass('hidden');
    $(event.target).addClass('hidden');
    $(sister2).addClass('hidden');
    var parent = event.target.parentNode;//div
    console.log('parent', parent);
    var brother = parent.previousElementSibling;//span
    console.log('brother', brother);
    var child = brother.lastElementChild;//input
    console.log('child', child);
    console.log(child.value);
    const text = brother.innerText;
    brother.innerText = '';
    const edit = `<input class="form-control editform" type="text" name="item" id="item" value="${text}">`
    brother.insertAdjacentHTML('afterbegin', edit);
}

function edit_f(event) {
    console.log(event);//終了btn
    console.log(event.target);
    var parent = event.target.parentNode;//div
    console.log('parent', parent);
    var brother = parent.previousElementSibling;//span
    console.log('brother', brother);
    var child = brother.lastElementChild;//input.text
    console.log('child', child);
    console.log(child.value);
    const edi_li = `<input type="checkbox" class="me-3" onchange="check(event)">${child.value}`
    child.innerText = '';
    brother.insertAdjacentHTML('afterbegin', edi_li);
    $('.editform').remove();
    var sister = event.target.nextElementSibling;//編集btn
    console.log('sister', sister);
    var sister2 = sister.nextElementSibling;//btn
    console.log('sister2', sister2);
    sister2.disabled = true;
    $(sister).removeClass('hidden');
    $(event.target).addClass('hidden');
    $(sister2).removeClass('hidden');
}

function del(event) {
    console.log(event);
    var parent = event.parentNode;
    console.log('parent', parent);
    var gparent = parent.parentNode;
    console.log('gparent', gparent);
    gparent.remove();
    // const con = document.getElementById('con'+num);
    // con.remove();

    // var li_cnt = $('#contents li').length;
    // console.log(li_cnt);
    // var obj = {};
    // for (let i = 1; i < li_cnt + 1; i++) {
    //     $('#contents li').eq(i - 1).attr('id', `${i}`);
    //     // console.log(document.getElementById(`${i}`).outerHTML);
    //     obj[i] = document.getElementById(`${i}`).outerHTML;
    //     // console.log(obj);
    // }
    // var obj = JSON.stringify(obj);
    // localStorage.setItem('Key', obj);

    var li_cnt = $('#contents li').length;
    // console.log(li_cnt);
    var arr = [];
    for (let i = 0; i < li_cnt; i++) {
        // console.log($('#contents li').eq(i).prop("outerHTML"));
        arr[i] = $('#contents li').eq(i).prop("outerHTML");
        // console.log(arr);
    }
    var arr = JSON.stringify(arr);
    localStorage.setItem('Key', arr);
}

function alldel(event) {
    console.log(event);//alldel_btn
    var parent = event.target.parentNode;//div_alldel
    console.log('parent', parent);
    var brother = parent.previousElementSibling;//div_li
    console.log('brother', brother);
    var child = brother.lastElementChild;//ul
    console.log('child', child);
    while (child.firstChild) {
        child.removeChild(child.firstChild);
    }

    // var li_cnt = $('#contents li').length;
    // console.log(li_cnt);
    // var obj = {};
    // for (let i = 1; i < li_cnt + 1; i++) {
    //     $('#contents li').eq(i - 1).attr('id', `${i}`);
    //     // console.log(document.getElementById(`${i}`).outerHTML);
    //     obj[i] = document.getElementById(`${i}`).outerHTML;
    //     // console.log(obj);
    // }
    // var obj = JSON.stringify(obj);
    // localStorage.setItem('Key', obj);

    var li_cnt = $('#contents li').length;
    // console.log(li_cnt);
    var arr = [];
    for (let i = 0; i < li_cnt; i++) {
        // console.log($('#contents li').eq(i).prop("outerHTML"));
        arr[i] = $('#contents li').eq(i).prop("outerHTML");
        // console.log(arr);
    }
    var arr = JSON.stringify(arr);
    localStorage.setItem('Key', arr);

}

var all_cnt = 0;

function allcheck(event) {
    console.log(event);//input要素
    var parent = event.target.parentNode;//div all
    console.log('parent', parent);
    const allbtn = parent.lastElementChild;
    console.log("allbtn", allbtn);

    console.log(event.target.checked);
    if (event.target.checked) {
        all_cnt += 1;
        console.log(all_cnt);
    } else {
        all_cnt -= 1;
        allbtn.disabled = true;
    }
    if (all_cnt === 3) {
        allbtn.disabled = false;
    }
}