# fetch-refresh
A fetch script with support for auto refreshing a token

For usage with access and refresh tokens based on cookies (http only).

have functions for get,del,post and put.


If the first request fails due to error 401.
Call an refresh update where the server should reply back with a new access token.
If the refresh call is successfull retry the original request with hopefully a correct token.


Up to you to solve what will happen if we are not able to refresh.
