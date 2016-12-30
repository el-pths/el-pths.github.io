$(function() {
  var bbls = [[250, 160], [320, 120], [220, 230], [305, 215], [370, 245], [200, 300], [285, 300], [375, 330],
    [170, 370], [255, 375], [335, 385], [420, 380], [100, 450], [190, 470], [290, 480], [380, 475], [475, 450]];
  var colors = ['#f33', '#fd0', '#4bf', '#2f5'];
  var image = $('img#tree');
  var wrapper = $('.img-wrap');
  var imgH = image.height();
  var imgW = image.width();
  var baubleSz = 30;
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
  }
  
  function hangBaubles() {
    for (var i in bbls) {
      var bbl = $('<div class="bauble"/>');
      var top = Math.floor(bbls[i][1] * scale);
      var left = Math.floor(bbls[i][0] * scale);
      bbl.css('top', top + 'px').css('left', left + 'px');
      bbl.attr('data-top', bbls[i][1]).attr('data-left', bbls[i][0]);
      bbl.css('background', colors[Math.floor(Math.random() * colors.length)]).appendTo(wrapper);
    }
  }
  
  hangBaubles();
  onResize();
  $(window).resize(onResize);
});

