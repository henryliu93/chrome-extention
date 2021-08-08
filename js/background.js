chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.create({'url': chrome.extension.getURL('demo/index.html')}, function (tab) {
  });
});

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
	if(!text) return;
	if(text == '美女'){
		suggest([
			{content: '中国' + text, description: '你要找“中国美女”吗？'},
			{content: '日本' + text, description: '你要找“日本美女”吗？'},
			{content: '韩国' + text, description: '你要找“韩国美女”吗？'}
		]);
	}
});

chrome.omnibox.onInputEntered.addListener((text) => {
	if(!text) return;
	var href = '';
	if(text.endsWith('美女')) href = 'http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=' + text;
	else if(text.startsWith('百度搜索')) href = 'https://www.baidu.com/s?ie=UTF-8&wd=' + text.replace('百度搜索','');
	else if(text.startsWith('谷歌搜索')) href = 'https://www.google.com.tw/search?q=' + text.replace('谷歌搜索','');
	else href = 'https://www.baidu.com/s?ie=UTF-8&wd=' + text;
	openUrlCurrentTab(href);
});

// 获取当前选项卡ID
function getCurrentTabId(callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}

// 当前标签打开某个链接
function openUrlCurrentTab(url)
{
	getCurrentTabId(tabId => {
		chrome.tabs.update(tabId, {url: url});
	})
}


function checkUpdate(t){
	if (t > 0){
		chrome.browserAction.setBadgeText({text: 'new'});
		chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
	}
}

checkUpdate(1)