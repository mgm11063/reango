/* =================================== 필수 변경정보 ================================= */

/* 타이틀 정보 입력 */
var large_title; //과정명
var small_title; //차시명
var total_page_cnt; //총 페이지수

/* 동영상 경로 지정 */

var vodOptions = {};
vodOptions.STREAMING_IP; //ip
vodOptions.STREAMING_PORT; //port
vodOptions.STREAMING_DIR; //streaming dir
vodOptions.VIDEO_URL; //video url
vodOptions.VIDEO_DIR; //video total dir

var streaming_ip; //ip
var streaming_port; //port
var streaming_dir; //streaming dir
var video_url; //video url
var video_dir; //video total dir

/* 이전에 어디까지 봤는지 가져오기 */
var bookMarkType = parent.$("#bookMarkType").val();
var sday = parent.$("#sday").val() * 1;
var a = parent.$("#lastFrameseq").val();
var _movsec = Number(parent.$("#movsec").val());
var _movsec_mm = Number(parent.$("#movsec_mm").val());
var _movsec_ss = Number(parent.$("#movsec_ss").val());
var progressYn = parent.$("#progressYn").val();
var isPass = parent.$("#isPass").val();
var framecnt = parent.$("#framecnt").val();
var runtime = parent.$("#runtime").val();
var studytime = parent.$("#studytime").val();
var mobileFilePath = parent
  .$("#mobileFilePath")
  .val()
  .replace("index.html", "");
mobileFilePath = mobileFilePath.replace("//", "/");

var pageidx = a - 1;
//alert(a);
//alert(_movsec);
/* =================================== 콘텐츠 유동사항 ============================================= */

/* 레이아웃 옵션 지정 */
var headmargin = 65; //상단바 세로길이
var footmargin = 40; //하단바 세로길이

/* 영상관련 변수 지정 */
var _movWidth = "100%";
var _movHeight = $(window).height() - headmargin - footmargin;
var _movImage = "images/bg.jpg"; //동영상 썸네일이미지
var _pageIdx = 1; // 현재페이지의 idx 를 담는 변수
var _bestPageIdx = 1; //최대진도 페이지
var _setPlayerSave = "|"; // 한번 불러온 이력이 있는 페이지의 idx 를 누적하기 위한 변수
var _setPlayerPlayed = 1; // play 된 비디오 페이지를 벗어나면 일시정지 처리하기 위한 변수
var _firstLoad = 0; //0이면 최초
var _movsecPercent = 100; //동영상 진행시간(%)
var _openTimeSec = 0; //창 열어둔 시간
var _openPageTimeSec = 500; //페이지 열어둔 시간

var _playMergeSec = 0; //영상 실행 누적시간

var _isPlay = false;
var bxIdx = 1; //bxSlide 이전 idx 저장
var leftOpenAt = "Y";

var _restart = false;
var _isCurrentComp = isPass == "Y" ? true : true;

/* 사용자 접속환경 (리턴 : PC, Android, IOS) */
if (connectDevice == "Android" || connectDevice == "") connectDevice = "PC";

var frame_comp_status_mobile;
var frame_comp_status_mobile_array = new Array();

/* =================================== 개발 스크립트 ======================================= */

var sliders;
$(document).ready(function () {
  /* 마우스 우클릭 방지 */
  $(document).bind("contextmenu", function () {
    return false;
  });

  /* 최초 인트로 호출 */
  xmlLoad("sub" + mobileFilePath + "c01.xml");

  if (framecnt == "1") {
    $("#footer_wrap").hide();
    $("#leftUI").hide();

    var reTxt = _movsec_mm > 0 ? _movsec_mm + "분 " : "";
    reTxt += _movsec_ss > 0 ? _movsec_ss + "초" : "";

    if (isPass != "Y" && _movsec > 0 && !_isPlay) {
      if (connectDevice == "IOS") {
        //alert(reTxt+' 까지 시청하였습니다.');
      } else {
        /*if(confirm(reTxt+' 까지 시청하였습니다.\n이어서 보시겠습니까?')){*/
        _restart = true;

        if (connectDevice === "PC" || connectDevice === "Android") {
          setTimeout(function () {
            //console.log('-----------------------' + currentTime/1);
            jwplayer("videoArea_" + _pageIdx)
              .seek(_movsec / 1)
              .play(true);
            //jwplayer('videoArea_' + _pageIdx).play(true);
          }, 1500);
        }
        /*}*/
      }
    }
  }
});

$(window).load(function () {});

function xmlLoad(xmlUrl) {
  $.ajax({
    type: "POST",
    url: "https://edu.kinfa.or.kr/edu-data/contents/mobile/" + xmlUrl,
    dataType: "xml",
    success: xmlResult,
  });
}

//var pageType;
var itemNmNowVars;
var itemNmNowText;

//xml 호출 및 페이지 세팅
function xmlResult(data) {
  _openPageTimeSec = 0;

  //pageType = $(data).find("pageType").text();

  /* 코디에듀 페이지타이틀 제어 */
  if (_firstLoad == 0) {
    // 최초 인트로 실행시
    itemNmNowVars = $(data).find("itemList").find("item");
  }
  itemNmNowVars.each(function (index) {
    if (index == _pageIdx - 1) {
      itemNmNowText = $(this).text();
      $(".title_title").html(itemNmNowText);
    }
  });

  if (_firstLoad == 0) {
    // 최초 인트로 실행시

    var itemVars = $(data).find("itemList").find("item");
    var itemNmHtml = "";
    itemVars.each(function (index) {
      itemNmHtml +=
        "<p class='fl_p' onclick='moveOnType(" +
        index +
        ");'>" +
        $(this).text() +
        "</p>";
    });
    $(".menu_div").html(itemNmHtml);

    /* 동영상 개수에 맞게 페이지 레이아웃 일괄 세팅 */
    total_page_cnt = $(data).find("totalPageCnt").text();

    var videoDivHtml = "";
    for (var i = 1; i <= total_page_cnt; i++) {
      if (i >= 10) {
        videoDivHtml +=
          "<li id='page-" +
          i +
          "'><div class='page_video_wrap'><div id='videoArea_" +
          i +
          "'></div></div></li>";
      } else {
        videoDivHtml +=
          "<li id='page-0" +
          i +
          "'><div class='page_video_wrap'><div id='videoArea_" +
          i +
          "'></div></div></li>";
      }
    }

    $(".slides").html(videoDivHtml);

    frame_comp_status_mobile = total_page_cnt;
    /* 모바일 진도체크(frame_comp_statu)  */
    for (var i = 0; i < frame_comp_status_mobile; i++) {
      frame_comp_status_mobile_array.push(0);
    }

    frame_comp_status_mobile_array[0] = 1;

    /* bxSlider 초기설정 (http://bxslider.com/options) */
    sliders = $(".slides").bxSlider({
      mode: "horizontal", //horizontal, vertical, fade
      speed: 500,
      auto: false,
      infiniteLoop: false, //마지막페이지에서 next 시 처음페이지로 가도록 설정할 지 여부
      autoControls: false,
      touchEnabled: false, //모바일에서 손가락스크롤로 페이지 넘기도록하기 false
      swipeThreshold: 70, //모바일에서 손가락스크롤 감도 조절
      adaptiveHeight: false, //동적 각 슬라이드 높이조정하기 true
      onSlideBefore: function () {
        //슬라이드 바뀔 시
        _movsecPercent = 0; //초기화

        _pageIdx = sliders.getCurrentSlide() + 1;

        /* [진도체크] prev, next 시 이벤트가 있을경우 진도 처리 */
        if (bxIdx > _pageIdx) {
          //prev
          callbackSetSubmitFunc("prev");
          frame_comp_status_mobile_array[_pageIdx - 1] = 1;
          bxIdx--;
        } else {
          //next

          if (total_page_cnt >= _pageIdx) {
            if (_bestPageIdx < _pageIdx) {
              _bestPageIdx = _pageIdx;
            }
          }
          callbackSetSubmitFunc("next");
          frame_comp_status_mobile_array[_pageIdx - 1] = 1;
          bxIdx++;
        }
        $(".slide-number").html(
          _pageIdx + "&nbsp;&nbsp;/&nbsp;&nbsp;" + sliders.getSlideCount()
        );

        /* 페이지별 xml 로드 */
        if (_pageIdx >= 10) {
          xmlLoad("sub" + mobileFilePath + "c" + _pageIdx + ".xml");
        } else {
          xmlLoad("sub" + mobileFilePath + "c0" + _pageIdx + ".xml");
        }
      },
    });
    $(".slide-number").html(
      _pageIdx + "&nbsp;&nbsp;/&nbsp;&nbsp;" + sliders.getSlideCount()
    );

    //변수.goToSlide(숫자)               지정한 '숫자' 슬라이드로 이동
    //변수.goToNextSlide()               다음 슬라이드로 이동
    //변수.goToPrevSlide()               이전 슬라이드로 이동
    //변수.startAuto()                       자동으로 슬라이드 전환
    //변수.stopAuto()                       자동 슬라이드 전환 기능 정지

    /* bxslider 제어 */
    $(".prev-slide").click(function () {
      sliders.goToPrevSlide();
    });
    $(".next-slide").click(function () {
      /* if(parent_pageno <= _pageIdx && _movsecPercent != 100) { //[진도체크] 복습하는 사람 아니면 영상 다 듣기전에 이 페이지 못넘기게 처리.
				alert("동영상을 끝까지 시청하셔야 다음으로 이동됩니다.");
			}else {
				//goToNextSlide 함수 여기다가 넣어야 함.
				sliders.goToNextSlide();
			} */
      /* if(($('#m_videoArea_'+_pageIdx)[0].currentTime==$('#m_videoArea_'+_pageIdx)[0].duration) &&	(_openPageTimeSec >= $('#m_videoArea_'+_pageIdx)[0].currentTime)){
				sliders.goToNextSlide();
			}else{
				alert('영상을 끝까지 시청하셔야 다음으로 이동됩니다.')
				//sliders.goToNextSlide();
			} */
      sliders.goToNextSlide();
      setFrame(_pageIdx);
    });

    /* [진도체크] 주기적으로(1초 간격) 동영상 진도 넘기기 */
    setInterval(callbackSetSubmitFunc, 1000, "auto");

    /* [진도체크] 강의창 열고 시간이 얼마나 경과했는지를 기록. */
    setInterval(function () {
      _openTimeSec++;
      _openPageTimeSec++;
    }, 1000);

    /* 레이아웃 초기값 셋팅 */
    layoutSet();
    $(window).resize(function () {
      layoutSet();
    });

    /* 목차보기 컨트롤러 클릭시 */
    $(".left_onoff").click(function () {
      if (leftOpenAt == "Y") {
        var leftGrid = $("#leftUI").width() * -1;
      } else {
        var leftGrid = 0;
      }
      $("#leftUI")
        .fadeIn()
        .animate({ left: leftGrid, width: "200px" }, 500)
        .find(".left_onoff");
      if (leftOpenAt == "Y") {
        $(".left_onoff span").text(">");
        leftOpenAt = "N";
      } else {
        $(".left_onoff span").text("<");
        leftOpenAt = "Y";
      }
    });
  }

  /* 코디에듀 각 페이지 내용 입력 */
  if (_setPlayerSave.indexOf("|" + _pageIdx + "|") == -1) {
    //최초 1회 로딩시에만 세팅

    /* 동영상 콘텐츠 실행 */
    if (_firstLoad == 0) {
      //c01.xml 에서 지정해준 공통정보를 입력받는다.
      streaming_ip = $(data).find("gotoUrl").find("ip").text();
      streaming_port = $(data).find("gotoUrl").find("port").text();
      streaming_dir = $(data).find("gotoUrl").find("baseDir").text();
      video_url = $(data).find("gotoUrl").find("videoDir").text();
    }
    video_dir = video_url + $(data).find("gotoUrl").find("fileName").text();
    contentsPlay();
    _setPlayerSave += _pageIdx + "|";
  }

  if (_firstLoad != 0) {
    /* 기존에 듣고있던 영상 일시정지... */
    if ("PC" == connectDevice || connectDevice == "Android") {
      //jwplayer 정지
      jwplayer("videoArea_" + _setPlayerPlayed).pause(true);
    } else if (connectDevice == "IOS") {
      //video 일시정지
      document.getElementById("m_videoArea_" + _setPlayerPlayed).pause();
    }
  } else {
    if (bookMarkType == "_01.html") {
      pageidx = a.substring(a.length - 7, a.length - 5) * 1 - 1;
    } else if (bookMarkType == "01.htm") {
      pageidx = a.substring(a.length - 6, a.length - 4) * 1 - 1;
    }
    /* 마지막 본 페이지부터 시작 */
    if (pageidx >= 0) {
      sliders.goToSlide(pageidx);
    }

    $(".slide-number").html(
      _pageIdx + "&nbsp;&nbsp;/&nbsp;&nbsp;" + sliders.getSlideCount()
    );
    _firstLoad = 1;
  }
  _setPlayerPlayed = _pageIdx;
}
