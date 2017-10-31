import http.client

conn = http.client.HTTPSConnection("bds.bablabs.com")

headers = {
    'accesstoken': "QXeCCoI5VbFKawSg6Taa6Wgg75LrpgpLqQMUxeoDx0jl3dm977",
    'babsession': "bot",
    'cache-control': "no-cache",
    'postman-token': "c82e201d-b01c-c96e-ec85-216af3319bbc"
    }

conn.request("GET", "/openapi/v1/campuses/iaSfflZqCl/stores?date=2017-10-30", headers=headers)

res = conn.getresponse()
data = res.read()
print(JSON.parse(data))
data.decode("utf-8")
