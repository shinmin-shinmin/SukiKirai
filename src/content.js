// 現在のページのコメント一覧ノード
var currentCommentContainerNode = $('.comment' +  '.container');

// ↓↓コメントノードを上から古い順に下に行くほど新しいコメントに並び変える。
var commentIdList = [];
var commentNodeList = [];
currentCommentContainerNode.children('.comment-container').each(function () {
  commentNodeList.push(this);
  var id = Number(this.id);
  if (isNaN(id)) {
  } else {
    commentIdList.push(id);
  }
});
currentCommentContainerNode.empty();
commentNodeList.reverse().forEach(x => currentCommentContainerNode.append(x));
// ↑↑コメントノードを上から古い順に下に行くほど新しいコメントに並び変える。

// ↓↓ひとつ前のページを読み込む。
var min = Number.MAX_SAFE_INTEGER;
for (var j = 0; j < commentIdList.length; j++) {
  if (min > commentIdList[j]) {
    min = commentIdList[j];
  }
}

var currentPageUrl = new URL(window.location);
var lastIndex = currentPageUrl.pathname.lastIndexOf('/', -2 + currentPageUrl.pathname.length);
var userName = currentPageUrl.pathname.substring(1 + lastIndex);
userName = userName.substring(0, -1 + userName.length);

var previousPageAddress = "https://suki-kira.com/people/result/" + userName + "/?nxc=" + min;
fetch(previousPageAddress) //【URL】
  .then(response => response.text()) .then(data => { 
    const html = new DOMParser().parseFromString(data, "text/html");
    const previousCommentContainerNodeList = html.querySelectorAll('div.comment.container div.comment-container');
    for (var k = 0; k < previousCommentContainerNodeList.length; k ++) {
      var newNode = document.createElement("div");
      newNode.innerHTML = previousCommentContainerNodeList[k].outerHTML;
      currentCommentContainerNode.prepend(newNode.firstChild);
    }
});
// ↑↑ひとつ前のページを読み込む。


// window.alert(min);





// window.alert(nextButton.text());





// https://suki-kira.com/people/result/%E5%A0%80%E5%8F%A3%E8%8B%B1%E5%88%A9/?nxc=1173380




// 前へボタンを取得
var latestButtonList = $('a:contains("最新へ")');
var nextButtonList = $('a:contains("次へ")');
var prevButtonList = $('a:contains("前へ")');

