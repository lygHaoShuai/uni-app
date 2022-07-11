import { baseUrl } from './config.js'

export function topList() {
	return new Promise(function(reslove,reject){
		uni.request({
			url: `${baseUrl}/toplist/detail`,
			method: 'GET',
			success: res => {
				let result = res.data.list
				result.length = 4
				reslove(result)
			}
		})
	})
}

export function song(id) {
	return new Promise(function(reslove,reject){
		uni.request({
			url: `${baseUrl}/playlist/detail?id=${id.listId}`,
			method: 'GET',
			success: res => {
				reslove(res.data.playlist)
			}
		})
	})
	
}

export function songList(id) {
	return new Promise(function(reslove,reject){
		uni.request({
			url: `${baseUrl}/playlist/track/all?id=${id.listId}&limit=30`,
			method: 'GET',
			success: res => {
				reslove(res.data.songs)
			}
		})
	})
	
}

export function songDetail(id) {
	return new Promise(function(reslove,reject){
		uni.request({
			url: `${baseUrl}/song/detail?ids=${id}`,
			method: 'GET',
			success: res => {
				reslove(res.data)
			}
		})
	})
	
}

export function songSimi(id) {
	return new Promise(function(reslove,reject){
		uni.request({
			url: `${baseUrl}/simi/song?id=${id}`,
			method: 'GET',
			success: res => {
				reslove(res.data)
			}
		})
	})
	
}

export function songComment(id) {
	return new Promise(function(reslove,reject){
		uni.request({
			url: `${baseUrl}/comment/music?id=${id}`,
			method: 'GET',
			success: res => {
				reslove(res.data)
			}
		})
	})
	
}

export function songLyric(id) {
	return new Promise(function(reslove,reject){
		uni.request({
			url: `${baseUrl}/lyric?id=${id}`,
			method: 'GET',
			success: res => {
				reslove(res.data)
			}
		})
	})
	
}

export function songUrl(id) {
	return new Promise(function(reslove,reject){
		uni.request({
			url: `${baseUrl}/song/url?id=${id}`,
			method: 'GET',
			success: res => {
				reslove(res.data.data[0])
			}
		})
	})
	
}