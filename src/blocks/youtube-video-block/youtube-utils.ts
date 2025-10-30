import UrlPattern from 'url-pattern'
import qs from 'query-string'

/**
 * YouTube utility functions for URL parsing and validation
 */

// Returns YouTube Player API options from a YouTube URL.
//  ie. { playlistId }
//      { videoId, start, end }
//      { query }
export function parseYouTubeUrl(url: string) {
  if (!url) return {}

  const [domain, querystring] = url.split('?')
  const options: any = {}
  const query = qs.parse(querystring)

  if (query.list && typeof query.list === 'string') {
    // URLs with a playlist can also have a video id so we need to check
    // for a playlist first.
    //  ie. https://www.youtube.com/watch?v=:videoId&list=:playlistId
    options.playlistId = query.list
  } else if (query.v && typeof query.v === 'string') {
    // Check if the video id was provided in the query string.
    //   ie. https://www.youtube.com/watch?v=:videoId
    options.videoId = query.v
  } else {
    // Check for short urls, direct urls and embed urls.
    //    ie. https://youtu.be/:videoId
    //        https://www.youtube.com/v/:videoId
    //        https://www.youtube.com/embed/:videoId
    const shortVideo = new UrlPattern('(http(s)\\://)(www.)youtu.be/:videoId')
    const directVideo = new UrlPattern('(http(s)\\://)(www.)youtube.com/v/:videoId')
    const embedVideo = new UrlPattern('(http(s)\\://)(www.)youtube.com/embed/:videoId')

    let params = shortVideo.match(domain)
    if (params) options.videoId = params.videoId

    params = directVideo.match(domain)
    if (params) options.videoId = params.videoId

    params = embedVideo.match(domain)
    if (params) options.videoId = params.videoId
  }

  // Check for start and end times for single videos.
  if (options.videoId) {
    // Start times can be set with &start= for embed urls or
    // &t= for short urls.
    if (query.start && typeof query.start === 'string') {
      options.start = parseInt(query.start, 10)
    } else if (query.t && typeof query.t === 'string') {
      options.start = parseInt(query.t, 10)
    }

    if (query.end && typeof query.end === 'string') {
      options.end = parseInt(query.end, 10)
    }
  }

  return options
}

/**
 * Extracts YouTube video ID from various URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtube.com/watch?v=VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://youtube.com/embed/VIDEO_ID
 * - VIDEO_ID (direct ID)
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null

  const options = parseYouTubeUrl(url)
  return options.videoId || null
}

/**
 * Validates if a string is a valid YouTube URL or video ID
 */
export function isValidYouTubeUrl(url: string): boolean {
  if (!url) return false

  const videoId = extractYouTubeVideoId(url)
  return videoId !== null && videoId.length === 11
}

/**
 * Generates YouTube embed URL from video ID
 */
export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`
}

/**
 * Generates YouTube thumbnail URL from video ID
 */
export function getYouTubeThumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}
