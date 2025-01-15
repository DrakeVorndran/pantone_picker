from urllib.request import urlopen
from bs4 import BeautifulSoup
import json

r_dict = {'set1' : []}

for i in range(1, 15):
	html = urlopen("https://www.numerosamente.it/pantone-list/fashion-and-interior-designers/" + str(i))
	soup = BeautifulSoup(html, 'lxml')

	print(i)

	for elem in soup.findAll('tr')[1:]:
		color = {}
		color['code'] = elem.findAll("td")[0].text
		color['rgb'] = elem.findAll("td")[1].text
		color['hex'] = elem.findAll("td")[2].text
		color['name'] = elem.findAll("td")[3].text
		color['category'] = elem.findAll("td")[4].text

		found_same_name = False
		for elem2 in r_dict['set1']:
			if color['name'] != '' and color['name'] == elem2['name']:
				found_same_name = True

		if not found_same_name:	
			r_dict['set1'].append(color)

print(len(r_dict['set1']))

f = open("newNumbers.js", "w")
f.write("const pantoneNumbers = {\n")
for color in r_dict['set1']:
    f.write(f"  \"{color['code']}\": {'{'}  \n")
    f.write(f"    \"name\": \"{color['name']}\",\n")
    f.write(f"    \"hex\": \"{color['hex'][1:]}\"\n")
    f.write("    },\n")

f.write("  }\n")
f.close()