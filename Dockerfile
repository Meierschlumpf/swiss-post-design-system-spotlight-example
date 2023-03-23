FROM docker.tools.post.ch/base/lighttpd:latest

# copy the built files into /var/www
COPY dist /var/www

RUN echo $'\n\
# Return index.html when the requested file does not exist. \n\
url.rewrite-if-not-file = ("/(.*)" => "/index.html") \n\
# Rewrite everything under /assets/environments/ to environment specific filenames. \n\
url.rewrite-once = ("/assets/environments/environment.js" => "/assets/environments/environment-" + env.SYSTEM_ENV + ".js") \n\
# Ensure everything under /assets/environments/ is not cached \n\
$HTTP["url"] =~ "/assets/environments/.*" { \n\
    setenv.add-response-header += ("Cache-Control" => "max-age=0, no-cache, no-store, must-revalidate",) \n\
    setenv.add-response-header += ("Pragma" => "no-cache",) \n\
    setenv.add-response-header += ("Expires" => "Thu, 1 Jan 1970 00:00:00 GMT",) \n\
} \n\
' >> /etc/lighttpd/lighttpd.conf

USER baseuser
EXPOSE 8080

CMD lighttpd -D -f /etc/lighttpd/lighttpd.conf
