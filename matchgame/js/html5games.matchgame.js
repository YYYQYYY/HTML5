/**
 * Created by yuqy on 2017/9/27.
 */
var matchingGame = {};
matchingGame.deck = [
    "cardAK", "cardAK",
    "cardAQ", "cardAQ",
    "cardBK", "cardBK",
    "cardBQ", "cardBQ",
    "cardCK", "cardCK",
    "cardCQ", "cardCQ"
]
;
$(function () {
    // 洗牌
    matchingGame.deck.sort(shuffle);
    for (var i = 0; i < 11; i++) {
        $(".card:first-child").clone().appendTo("#cards");
    }
    $("#cards").children().each(function (index) {
        $(this).css({
            "left": ($(this).width() + 20) * (index % 4),
            "top": ($(this).height() + 20) * Math.floor(index / 4)
        });

        // 从洗过的纸牌中获取图案
        var pattern = matchingGame.deck.pop();
        // 应用纸牌的背面图案，并让其可见
        $(this).find(".back").addClass(pattern);
        // 把图案数据嵌入DOM元素中
        $(this).attr("data-pattern", pattern);
        // 监听每张纸牌DIV元素的单击事件
        $(this).click(selectCard);
    });
});

function shuffle() {
    return 0.5 - Math.random();
}

function selectCard() {
    if ($(".card-flipped").size() > 1) {
        return;
    }
    $(this).addClass("card-flipped");
    if ($(".card-flipped").size() == 2) {
        setTimeout(checkPattern, 700);
    }
}

function checkPattern() {
    if (isMatchPattern()) {
        $(".card-flipped").removeClass("card-flipped").addClass("card-removed");
        $(".card-removed").bind("webkitTransitionEnd", removeTookCards);
    } else {
        $(".card-flipped").removeClass("card-flipped");
    }
}

function isMatchPattern() {
    var cards = $(".card-flipped");
    var pattern = $(cards[0]).data("pattern");
    var anotherPattern = $(cards[1]).data("pattern");

    return (pattern == anotherPattern);
}

function removeTookCards() {
    $(".card-removed").remove();
}
