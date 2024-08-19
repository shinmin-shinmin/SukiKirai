let currentCommentContainerNode;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadCommentPage(address) {
  await fetch(address) //【URL】
    .then(response => response.text()) .then(data => { 
      const html = new DOMParser().parseFromString(data, "text/html");
      const previousCommentContainerNodeList = html.querySelectorAll('div.comment.container div.comment-container');
      for (var k = 0; k < previousCommentContainerNodeList.length; k ++) {
        var newNode = document.createElement("div");
        newNode.innerHTML = previousCommentContainerNodeList[k].outerHTML;
        currentCommentContainerNode.prepend(newNode.firstChild);
      }
  });
}

async function MyExtension() {
  // 現在のページのコメント一覧ノード
  currentCommentContainerNode = $('.comment' +  '.container');

  // ↓↓コメントノードを上から古い順に下に行くほど新しいコメントに並び変える。
  var commentNodeList = [];
  currentCommentContainerNode.children('.comment-container').each(function () {
    commentNodeList.push(this);
  });
  currentCommentContainerNode.empty();
  commentNodeList.reverse().forEach(x => currentCommentContainerNode.append(x));
  // ↑↑コメントノードを上から古い順に下に行くほど新しいコメントに並び変える。

  // ↓↓100個前までのページを読み込む。
  for (var i = 0; i < 20; i ++) {
    var min = currentCommentContainerNode.first().get(0).firstChild.id;
    var currentPageUrl = new URL(window.location);
    var lastIndex = currentPageUrl.pathname.lastIndexOf('/', -2 + currentPageUrl.pathname.length);
    var userName = currentPageUrl.pathname.substring(1 + lastIndex);
    userName = userName.substring(0, -1 + userName.length);
    var previousPageAddress = "https://suki-kira.com/people/result/" + userName + "/?nxc=" + min;
    await loadCommentPage(previousPageAddress);

    // 「前へ」のリンク先を変更する。
    min = currentCommentContainerNode.first().get(0).firstChild.id;
    var nextPageAddress = "/people/result/" + userName + "/?nxc=" + min;    
    var aNodeList = document.getElementsByTagName('a');
    for (const aNode of aNodeList) {
      if (aNode.href.includes("people/result/" + userName + "/?nxc=")) {
        aNode.href = nextPageAddress;
      }
    }
    
    // サーバー負荷を避けるためスリープを入れておく。
    await sleep(3000);
  }
  // ↑↑100個前までのページを読み込む。
}

MyExtension();




// window.alert(min);





// window.alert(nextButton.text());





// https://suki-kira.com/people/result/%E5%A0%80%E5%8F%A3%E8%8B%B1%E5%88%A9/?nxc=1173380




// 前へボタンを取得
var latestButtonList = $('a:contains("最新へ")');
var nextButtonList = $('a:contains("次へ")');
var prevButtonList = $('a:contains("前へ")');

