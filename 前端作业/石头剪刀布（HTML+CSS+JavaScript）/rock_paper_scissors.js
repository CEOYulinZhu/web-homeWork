
// 游戏规则部分
// 显示模态框按钮
const showModalBtn = document.getElementById('showModalBtn');
// 游戏规则模态框
const gameRulesModal = document.getElementById('gameRulesModal');
// 模态框背景
const modalBackdrop = document.getElementById('modalBackdrop');
// 关闭按钮
const closeBtn = gameRulesModal.querySelector('.close');

// 点击显示模态框按钮时添加活动类
showModalBtn.addEventListener('click', () => {
    // 添加活动类以显示模态框
    gameRulesModal.classList.add('active');
    // 添加活动类以显示模态框背景
    modalBackdrop.classList.add('active');
});

// 点击关闭按钮时调用关闭模态框函数
closeBtn.addEventListener('click', closeModal);

// 关闭模态框函数
function closeModal() {
    // 移除活动类以隐藏模态框
    gameRulesModal.classList.remove('active');
    // 移除活动类以隐藏模态框背景
    modalBackdrop.classList.remove('active');
}
//↑游戏规则部分

// 再来一局按钮
// 获取"再来一局"按钮并添加点击事件监听器
const againButton = document.querySelector('.again');
againButton.addEventListener('click', function () {
    // 隐藏游戏开始页面
    gameElement.style.display = 'none';

    // 显示游戏开始界面
    triangleElement.style.display = 'flex';

    // 清空玩家和电脑选择的图像
    imageElement.innerHTML = '';
    computerImageElement.innerHTML = '';
});
// ↑再来一局按钮部分


// 游戏开始界面 需要解决的问题，把鼠标悬浮的样式也克隆过去了

// 获取游戏开始界面的三角形元素
let triangleElement = document.querySelector('.triangle');
let gameElement = document.querySelector('.game');
let imageElement = document.querySelector('.player .image');
let computerImageElement = document.querySelector('.computer .image');

// 初始化得分
let totalScore = 0;
// 获取分数显示的元素
let scoreNumberElement = document.querySelector('.score .number');

// 复制元素的样式函数
function cloneStyle(fromEl, toEl) {
    // 获取源元素的计算样式
    const computedStyles = window.getComputedStyle(fromEl);

    // 遍历计算样式并复制到目标元素
    for (let i = 0; i < computedStyles.length; i++) {
        const styleName = computedStyles[i];
        const styleValue = computedStyles.getPropertyValue(styleName);

        // 排除:hover样式，不复制
        if (!styleName.includes(':hover')) {
            toEl.style[styleName] = styleValue;
        }
    }
}

// 判断胜负的函数
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return '平局';
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'scissors' && computerChoice === 'paper') ||
        (userChoice === 'paper' && computerChoice === 'rock')
    ) {
        return '您赢了';
    } else {
        return '电脑赢了';
    }
}

// 获取所有三角形元素
const triangleElements = document.querySelectorAll('.triangle div');

// 遍历每个三角形元素并添加点击事件监听器
triangleElements.forEach(function (element) {
    element.addEventListener('click', function () {
        // 隐藏游戏开始界面
        triangleElement.style.display = 'none';

        // 显示游戏开始页面
        gameElement.style.display = 'flex';

        // 获取用户选择的类名
        const userChoice = element.classList[0];

        // 克隆被点击的三角形元素
        const clonedElement = element.cloneNode(true);
        // 将克隆的元素插入到player image中
        imageElement.innerHTML = '';
        imageElement.appendChild(clonedElement);

        // 复制样式到克隆的元素
        cloneStyle(element, clonedElement);

        // 移除发光效果
        clonedElement.style.filter = 'none';
        // 移除外边距
        clonedElement.style.margin = '0';
        // 修改其大小
        clonedElement.style.width = '120px';
        clonedElement.style.height = '120px';

        // 电脑的选择
        // 随机选择computer的图像，克隆并插入到computer image中
        const computerElements = document.querySelectorAll('.triangle div');
        const computerIndex = Math.floor(Math.random() * computerElements.length);
        const computerChoice = computerElements[computerIndex].classList[0];
        const computerClonedElement = computerElements[computerIndex].cloneNode(true);
        computerImageElement.innerHTML = '';
        computerImageElement.appendChild(computerClonedElement);

        // 复制样式到克隆的元素
        cloneStyle(computerElements[computerIndex], computerClonedElement);
        // 移除发光效果
        computerClonedElement.style.filter = 'none';
        // 移除外边距
        computerClonedElement.style.margin = '0';
        // 修改其大小
        computerClonedElement.style.width = '120px';
        computerClonedElement.style.height = '120px';

        // 判断胜负
        const result = determineWinner(userChoice, computerChoice);
        // 更新胜负提示
        document.querySelector('.title h1').textContent = result;

        // 根据胜负为获胜方添加效果
        if (result === '您赢了') {
            imageElement.firstChild.style.filter = 'drop-shadow(0px 0px 20px white)';
            // 用户获胜，得分加一
            totalScore ++;
        } else if (result === '电脑赢了') {
            computerImageElement.firstChild.style.filter = 'drop-shadow(0px 0px 20px white)';
            // 电脑获胜，得分减一
            totalScore --;
        }
        // 更新总得分显示
        scoreNumberElement.textContent = totalScore;
    });
});


