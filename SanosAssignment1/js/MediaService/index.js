function parseFileLength(fileLengthStr) {
  if (fileLengthStr.indexOf(':') > -1) {
    return fileLengthStr
      .split(':', 2)
      .map(i => parseInt(i, 10))
      .map((num, idx) => num * 60 ** (1 - idx))
      .reduce((a, b) => a + b, 0);
  }

  return parseInt(fileLengthStr, 10);
}

/**
 *
 * @typedef {object} ArchiveOrgAudioMetadata
 * @property {string} identifier The audio's unique id
 * @property {string=} title The audio's title
 * @property {string=} description The audio's description
 * @property {Array<string>=} collection
 *    The list of collections the audio resides in
 * @property {string=} genre Genre of the file
 * @property {string=} language Language of the audio content
 * @property {string} imageURL Url to the image's thumbnail
 */

const MediaService = {
  /**
   * Fetch a page from archive.org Audio collection via the scraping Api.
   *
   * @return {Promise<ArchiveOrgAudioMetadata>}
   */
  async list() {
    const url = new URL('https://archive.org/services/search/v1/scrape');

    url.searchParams.append(
      'q',
      encodeURIComponent('year:1928 mediatype:audio')
    );
    url.searchParams.append(
      'fields',
      encodeURIComponent('title,description,collection,genre,language')
    );
    url.searchParams.append('count', 100);
    const result = await fetch(url);
    const resultJson = await result.json();

    return resultJson.items.map(item => ({
      ...item,
      name: item.title,
      imageURL: `https://archive.org/services/img/${item.identifier}`,
    }));
  },

  /**
   * Fetch the metadata of the mp3 file corresponding to an Audio from list().
   *
   * @param identifier The Audio's unique identifier
   * @return {Promise<{durationSeconds: (*|number), url: string}|null>}
   */
  async getMp3Metadata(identifier) {
    console.log('identifier');
    console.log(identifier);
    const url = `https://archive.org/metadata/${identifier}`;
    const result = await fetch(url);
    const resultJson = await result.json();
    console.log('resultJson');
    console.log(resultJson);
    const mp3File =
      resultJson.files.filter(fileItem => fileItem.format === 'VBR MP3')?.[0] ??
      null;

    if (!mp3File) {
      return null;
    }

    return {
      ...mp3File,
      url: `https://archive.org/download/${identifier}/${mp3File.name}`,
      durationSeconds: parseFileLength(mp3File.length),
    };
  },
};

export { MediaService };
