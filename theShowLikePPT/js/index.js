(function() {
    function setAllSectionHeight(height) {
        var cssHeight = height + 'px';
        var sections = document.querySelectorAll('.section');
        for (var i = 0; i < sections.length; ++i) {
            sections[i].style.height = cssHeight;
        }
    }
    function resizeBrowser() {
        setAllSectionHeight(window.innerHeight);
        var browserWidth = window.innerWidth;
        document.getElementsByTagName('html')[0].style.fontSize = browserWidth / 1536 * 100 + 'px';
    }
    function wheelScroller(e){
        var sectionHeight = window.innerHeight;
        var currentHeight = window.scrollY;
        var step = getStep(sectionHeight);
        if (e.wheelDelta < 0 && currentHeight + 10 < sectionHeight * 5) {
            scrollByY(currentHeight, currentHeight + sectionHeight, true, step);
            window.onmousewheel = cancleDefaultScroll;
        } else if (e.wheelDelta > 0 && currentHeight > 0) {
            scrollByY(currentHeight, currentHeight - sectionHeight, false, step);
            window.onmousewheel = cancleDefaultScroll;
        }
        e.preventDefault();
    }
    function cancleDefaultScroll(e) {
        e.preventDefault();
    }
    function scrollByY(currentHeight, to, direction, step) {
        if (direction) {
            if (currentHeight >= to) {
                window.onmousewheel = wheelScroller;
                return;
            }
            currentHeight += step;
        } else {
            if (currentHeight <= to) {
                window.onmousewheel = wheelScroller;
                return;
            }
            currentHeight -= step;
        }
        window.scrollTo(0, currentHeight);
        setTimeout(function() {
            scrollByY(currentHeight, to, direction, step);
        }, 1);
    }
    function getStep(height) {
        var i = 13;
        for (; i > 0; --i) {
            if (height % i === 0) {
                break;
            }
        }
        return i >= 1 ? i : 3;
    }
    function init() {
        resizeBrowser();
        window.onresize = resizeBrowser;
        window.onmousewheel = wheelScroller;
    }
    init();
})();