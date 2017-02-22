rm result.apib
rm result.html

cat \
  header.apib \
  session.apib \
  user.apib \
  data_structures.apib \
> result.apib

aglio -i result.apib -o result.html

rm result.apib
