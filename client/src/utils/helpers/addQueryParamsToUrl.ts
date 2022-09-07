interface IParam {
  name: string;
  value: any;
}

export default function addQueryParamsToUrl(url: string, query: object) {
  let count = 0;
  let resultUrl = url;

  const params: IParam[] = [];

  for (const [key, value] of Object.entries(query)) {
    if (value) {
      params.push({ name: key, value });
    }
  }

  params.forEach((param) => {
    if (count != 0) {
      resultUrl += "&";
    }
    resultUrl += `${param.name}=${param.value}`;
    count++;
  });

  return resultUrl;
}
