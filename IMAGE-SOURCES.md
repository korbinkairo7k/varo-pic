# Varopic photography sources

Retrieved and visually checked on 4 November 2026. These are real photographs sourced from Pexels, not generated images. All depict illustrative industry settings; none implies a Varopic-owned facility, customer relationship, endorsement or office location. Some photos were taken outside the United States and must not be described as Varopic facilities or specific US locations.

## License

All selected source pages label their photographs free to use under the [Pexels License](https://www.pexels.com/license/). Pexels states that personal and commercial use is free and attribution is not required; credits are retained here as a courtesy and for provenance. See [Pexels licensing explanation](https://help.pexels.com/hc/en-us/articles/360042295174-What-is-the-license-of-the-photos-and-videos-on-Pexels) and [terms](https://www.pexels.com/terms-of-service/). Do not sell or redistribute these photographs as standalone stock, imply endorsement by pictured people or brands, or use them to represent invented clients or facilities.

## Asset mapping

Paths below are relative to `public/images/`. Each asset also has a `-600.jpg` variant at 600px width. Full images are 1200px wide, except hero-logistics at 1400px. Downloaded directly from Pexels image delivery with compression, sRGB, and quality 80–85. Cropping is performed responsively in CSS, preserving originals here.

| Asset | Subject / suggested alt text | Photographer | Source |
| --- | --- | --- | --- |
| hero-logistics.jpg | Wide view of production machinery inside a bright, modern industrial facility | Jhonny' Mages | [Spacious Industrial Factory Interior in Brazil](https://www.pexels.com/photo/spacious-industrial-factory-interior-in-brazil-30990853/) |
| hero-food.jpg | Stainless steel fermentation tanks inside a beverage production facility | Mark Stebnicki | [Steel Tanks in Brewery](https://www.pexels.com/photo/steel-tanks-in-brewery-17765433/) |
| hero-pharma.jpg | Gloved workers preparing tablet packaging on a pharmaceutical production line | Elements Interactive | [Pharmaceutical Workers in a Production Line](https://www.pexels.com/photo/pharmaceutical-workers-in-a-production-line-37466061/) |
| industry-food.jpg | Workers inspecting tomatoes on a food processing conveyor | Mark Stebnicki | [Women Sorting Tomatoes on a Production Line](https://www.pexels.com/photo/women-sorting-tomatoes-on-a-production-line-8877381/) |
| industry-energy.jpg | Pipes and processing towers at an industrial refinery | 龔 月強 | [Inside a Petrochemical Industry](https://www.pexels.com/photo/inside-a-petrochemical-industry-5884386/) |
| industry-pharma.jpg | Glass ampoules being filled and sealed on pharmaceutical production equipment | Elements Interactive | [Pharmaceutical Production Line in Action](https://www.pexels.com/photo/pharmaceutical-production-line-in-action-37650270/) |
| industry-manufacturing.jpg | Automated machinery and conveyors on a manufacturing floor | Freek Wolsink | [Automated Factory Conveyor System in Operation](https://www.pexels.com/photo/automated-factory-conveyor-system-in-operation-34222005/) |
| industry-logistics.jpg | Palletized cartons organized on tall warehouse shelves | Ryan Klaus | [Low Angle Shot of Boxes Standing on the Shelves in a Warehouse](https://www.pexels.com/photo/low-angle-shot-of-boxes-standing-on-the-shelves-in-a-warehouse-27111449/) |
| industry-services.jpg | Modern commercial building with glass frontage and landscaped grounds | Zulfugar Karimov | [Modern Glass Office Building Surrounded by Greenery](https://www.pexels.com/photo/modern-glass-office-building-surrounded-by-greenery-33719788/) |
| industry-technology.jpg | Rack-mounted servers and indicator lights in a data center | panumas nikhomkhai | [Light on Computer](https://www.pexels.com/photo/light-on-computer-17489153/) |

## Crop guidance

- Hero industrial photo: center or 50% 55%; machines occupy the middle, roof structure remains visible above.
- Hero food: center; central aisle and large tanks give an architectural composition.
- Hero pharma: center; avoid cropping away the gloved hands and tablet strip in the lower center.
- Industry images work well at 3:2 or 16:10 with `object-fit: cover; object-position: center`.
- Food card: the conveyor and workers remain clear at 16:10; central framing is appropriate.
- Refinery card: prefer center 55% to emphasize infrastructure rather than the pale sky.
- Logistics card is intentionally darker; do not overlay text on the photo.
- Technology feature: center crop, with slightly reduced saturation in CSS to match the restrained palette. Source and license verified on 4 November 2026; 1200px and 600px local variants.

## Image download pattern

For provenance, each local asset was downloaded from `https://images.pexels.com/photos/PHOTO_ID/pexels-photo-PHOTO_ID.jpeg?auto=compress&cs=tinysrgb&w=WIDTH&q=QUALITY`, using the photo ID in the linked source page. No external runtime image dependency is needed.
