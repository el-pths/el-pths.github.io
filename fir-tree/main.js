$(window).load(function() {
  try {
    firTreeMain();
  } catch (e) {
    alert(e.message + '\n\n' + e.stack);
  }
});

function firTreeMain() {
  var bbls = [[250, 160], [320, 120], [220, 230], [305, 215], [370, 245], [200, 300], [285, 300], [375, 330],
    [170, 370], [255, 375], [335, 385], [420, 380], [100, 450], [190, 470], [290, 480], [380, 475], [475, 450]];
  var toggles = [];
  var states = [];
  var colors = ['#f33', '#fd0', '#4bf', '#2f5'];
  var image = $('img#tree');
  var wrapper = $('.img-wrap');
  var bs = null;
  var imgH = image.height();
  var imgW = image.width();
  var gift = $('#gift');
  var giftH = gift.height();
  var giftW = gift.width();
  var baubleSz = 40;
  var scale = 1;
  
  function onResize() {
    var winH = $(window).height();
    var winW = $(window).width();
    scale = Math.min(winH/imgH, winW/imgW);
    wrapper.width(Math.floor(imgW * scale - 2)).height(Math.floor(imgH * scale - 2));
    image.css('width', '100%').css('height', '100%');
    $('.bauble').css('height', Math.floor(baubleSz * scale)).css('width', Math.floor(baubleSz * scale))
      .css('border-radius', Math.floor(baubleSz * scale / 2))
      .each(function(idx, obj) {
        var bbl = $(obj);
        bbl.css('top', Math.floor(bbl.attr('data-top') * scale) + 'px')
          .css('left', Math.floor(bbl.attr('data-left') * scale) + 'px');
      });
    gift.height(Math.floor(giftH * scale));
    gift.width(Math.floor(giftW * scale));
    gift.css('top', (wrapper.height() - gift.height() - 1) + 'px');
    gift.css('left', Math.floor(wrapper.width() / 2 - gift.width() / 2) + 'px');
    $('.hint').css('font-size', Math.floor(scale * 100) + '%');
  }
  
  function hangBaubles() {
    for (var i in bbls) {
      var bbl = $('<div class="bauble"/>');
      var top = Math.floor(bbls[i][1] * scale);
      var left = Math.floor(bbls[i][0] * scale);
      bbl.css('top', top + 'px').css('left', left + 'px');
      bbl.addClass('noselect');
      bbl.attr('data-top', bbls[i][1]).attr('data-left', bbls[i][0]).attr('data-idx', i);
      bbl.css('background', colors[Math.floor(Math.random() * colors.length)]).appendTo(wrapper);
    }
    bs = $('.bauble');
  }
  
  function setupToggles() {
    for (var i in bbls) {
      var keys = [];
      keys[i] = 1;
      var extras = Math.floor(Math.random() * 3 / 2 + 1);
      while (extras > 0) {
        var k = Math.floor(Math.random() * bbls.length);
        if (typeof(keys[k]) == 'undefined') {
            extras -= 1;
            keys[k] = 1;
        }
      }
      var t = [];
      for (var kk in keys) {
        t.push(kk);
      }
      toggles.push(t);
      var st = Math.random() > 0.6;
      states.push(st);
      toggleOne(i, st, 0);
    }
    updateCounter();
    bs.click(function() {
      var idx = $(this).attr('data-idx');
      toggle(idx);
    });
  }
  
  function toggle(idx) {
    for (var i in toggles[idx]) {
      var k = toggles[idx][i];
      states[k] = !states[k];
      toggleOne(k, states[k], 200);
    }
    updateCounter();
  }
  
  function toggleOne(i, st, dur) {
    var b = $(bs.get(i));
    if (st) {
      b.fadeTo(dur, 1.0);
    } else {
      b.fadeTo(dur, 0.4);
    }
  }
  
  function updateCounter() {
    var sum = 0;
    for (var i in states) {
      if (!states[i]) {
        sum += 1;
      }
    }
    $('#cnt').text(sum);
    if (sum == 0) {
      $('#gift').fadeTo(0,0, function() {$(this).css('visibility', 'visible').css('z-index', 10).fadeTo(500, 1.0)});
      setInterval(function() {
        var idx = Math.floor(Math.random() * bbls.length);
        states[idx] = !states[idx];
        toggleOne(idx, states[idx], 300);
      }, 100);
    }
  }
  
  hangBaubles();
  setupToggles();
  onResize();
  $(window).resize(onResize);
}
