import { API_HOST } from "@/const";

const formatURL = (url) => {
  const { pathname, searchParams } = new URL(API_HOST + url)

  searchParams.forEach((value, key) => {
    if (value == '' || value == 'null' || value == 'undefined' || value == 0) searchParams.delete(key);
  })

  const formated = `${API_HOST}${pathname}?${searchParams.toString()}&key=${process.env.apiKey}`

  return formated;
}

export default formatURL