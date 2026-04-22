// Area data for /wedding-dj/:slug pages.
// Add a new entry here to publish a new area landing page.
// Postcodes and population aren't strictly required but help the
// hash-rotated templates produce richer location-specific copy.

// Hero image rotation — spreads images across areas so neighbouring
// pages don't share the same photo.
const HERO_ROTATION = [
  '/assets/images/gallery-castle-party.webp',
  '/assets/images/gallery-white-tent-setup.webp',
  '/assets/images/gallery-rustic-setup.webp',
  '/assets/images/gallery-bride-dancing.webp',
  '/assets/images/gallery-blue-lasers.webp',
  '/assets/images/gallery-first-dance.webp',
  '/assets/images/gallery-sax-player.webp',
  '/assets/images/gallery-laser-red.webp',
  '/assets/images/gallery-hotel-setup.webp',
  '/assets/images/gallery-green-lasers.webp',
  '/assets/images/gallery-tent-party.webp',
  '/assets/images/gallery-saxy-vibes.webp',
];

function heroFor(slug, index) {
  return HERO_ROTATION[index % HERO_ROTATION.length];
}

const rawAreas = [
  // Regions / counties
  {
    slug: 'west-midlands',
    name: 'West Midlands',
    county: 'West Midlands',
    countySlug: 'west-midlands',
    postcodes: ['B', 'DY', 'WV', 'WS', 'CV'],
    population: 2920000,
    areaType: 'region',
    intro:
      'A densely populated region spanning Birmingham, the Black Country and the southern reaches of the Midlands, with a wedding venue scene that ranges from modern city hotels to Victorian mansions and converted industrial spaces.',
    nearbyAreas: [
      { name: 'Birmingham', slug: 'birmingham' },
      { name: 'Solihull', slug: 'solihull' },
      { name: 'Wolverhampton', slug: 'wolverhampton' },
      { name: 'Warwickshire', slug: 'warwickshire' },
    ],
  },
  {
    slug: 'worcestershire',
    name: 'Worcestershire',
    county: 'Worcestershire',
    countySlug: 'worcestershire',
    postcodes: ['WR', 'DY', 'B'],
    population: 592000,
    areaType: 'county',
    intro:
      'From the River Severn cities of Worcester and Droitwich to the Malvern Hills and the Vale of Evesham, Worcestershire offers country houses, castles, Tudor manors and rustic barn venues in equal measure.',
    nearbyAreas: [
      { name: 'Worcester', slug: 'worcester' },
      { name: 'Malvern', slug: 'malvern' },
      { name: 'Bromsgrove', slug: 'bromsgrove' },
      { name: 'Kidderminster', slug: 'kidderminster' },
    ],
    nearbyVenues: ['eastnor-castle'],
  },
  {
    slug: 'herefordshire',
    name: 'Herefordshire',
    county: 'Herefordshire',
    countySlug: 'herefordshire',
    postcodes: ['HR'],
    population: 192000,
    areaType: 'county',
    intro:
      'Rural Herefordshire is known for black-and-white timbered villages, the Wye Valley, and country estates that host some of the most atmospheric weddings in the West Midlands.',
    nearbyAreas: [
      { name: 'Hereford', slug: 'hereford' },
      { name: 'Ledbury', slug: 'ledbury' },
      { name: 'Ross-on-Wye', slug: 'ross-on-wye' },
      { name: 'Leominster', slug: 'leominster' },
    ],
    nearbyVenues: ['eastnor-castle'],
  },
  {
    slug: 'gloucestershire',
    name: 'Gloucestershire',
    county: 'Gloucestershire',
    countySlug: 'gloucestershire',
    postcodes: ['GL'],
    population: 647000,
    areaType: 'county',
    intro:
      'Home to Cheltenham, the Cotswolds, the Forest of Dean, and the Severn Vale. Venue styles span honey-stone country houses, converted barns, riverside hotels and Regency ballrooms.',
    nearbyAreas: [
      { name: 'Cheltenham', slug: 'cheltenham' },
      { name: 'Gloucester', slug: 'gloucester' },
      { name: 'Cirencester', slug: 'cirencester' },
      { name: 'Cotswolds', slug: 'cotswolds' },
    ],
  },
  {
    slug: 'warwickshire',
    name: 'Warwickshire',
    county: 'Warwickshire',
    countySlug: 'warwickshire',
    postcodes: ['CV', 'B'],
    population: 596000,
    areaType: 'county',
    intro:
      'Stratford-upon-Avon, Warwick and Royal Leamington Spa give Warwickshire a distinctly refined wedding scene — Tudor, Regency and country-house venues that look straight off a period drama.',
    nearbyAreas: [
      { name: 'Stratford-upon-Avon', slug: 'stratford-upon-avon' },
      { name: 'Warwick', slug: 'warwick' },
      { name: 'Royal Leamington Spa', slug: 'royal-leamington-spa' },
      { name: 'Rugby', slug: 'rugby' },
    ],
  },
  {
    slug: 'shropshire',
    name: 'Shropshire',
    county: 'Shropshire',
    countySlug: 'shropshire',
    postcodes: ['SY', 'TF', 'WV'],
    population: 498000,
    areaType: 'county',
    intro:
      'One of England\'s most rural counties, with medieval market towns, the Ironbridge Gorge, and country-house estates that suit couples looking for something quieter and more distinctive.',
    nearbyAreas: [
      { name: 'Shrewsbury', slug: 'shrewsbury' },
      { name: 'Telford', slug: 'telford' },
      { name: 'Ludlow', slug: 'ludlow' },
      { name: 'Bridgnorth', slug: 'bridgnorth' },
    ],
  },
  {
    slug: 'south-gloucestershire',
    name: 'South Gloucestershire',
    county: 'South Gloucestershire',
    countySlug: 'south-gloucestershire',
    postcodes: ['BS', 'GL'],
    population: 290000,
    areaType: 'region',
    intro:
      'North of Bristol and south of the Cotswolds, with wedding venues ranging from country-house hotels to converted barns and modern estates.',
    nearbyAreas: [
      { name: 'Gloucestershire', slug: 'gloucestershire' },
      { name: 'Cotswolds', slug: 'cotswolds' },
      { name: 'Tewkesbury', slug: 'tewkesbury' },
      { name: 'Stroud', slug: 'stroud' },
    ],
  },
  {
    slug: 'cotswolds',
    name: 'Cotswolds',
    county: 'Gloucestershire',
    countySlug: 'gloucestershire',
    postcodes: ['GL', 'OX', 'WR'],
    population: 139000,
    areaType: 'region',
    intro:
      'The Cotswolds AONB is one of the UK\'s most sought-after wedding backdrops — honey-stone villages, rolling countryside, and a dense scattering of country-house and barn venues across Gloucestershire, Oxfordshire and Worcestershire.',
    nearbyAreas: [
      { name: 'Cirencester', slug: 'cirencester' },
      { name: 'Tewkesbury', slug: 'tewkesbury' },
      { name: 'Stroud', slug: 'stroud' },
      { name: 'Cheltenham', slug: 'cheltenham' },
    ],
  },

  // Worcestershire towns
  {
    slug: 'worcester',
    name: 'Worcester',
    county: 'Worcestershire',
    countySlug: 'worcestershire',
    postcodes: ['WR1', 'WR2', 'WR3', 'WR4', 'WR5'],
    population: 103000,
    areaType: 'city',
    intro:
      'Cathedral city on the River Severn, with Georgian streets, the Worcester Porcelain quarter, and a wedding scene that ranges from grand country estates on its outskirts to elegant city-centre hotels and historic riverside venues.',
    nearbyAreas: [
      { name: 'Droitwich Spa', slug: 'droitwich-spa' },
      { name: 'Malvern', slug: 'malvern' },
      { name: 'Pershore', slug: 'pershore' },
      { name: 'Bromsgrove', slug: 'bromsgrove' },
    ],
    nearbyVenues: ['eastnor-castle'],
  },
  {
    slug: 'redditch',
    name: 'Redditch',
    county: 'Worcestershire',
    countySlug: 'worcestershire',
    postcodes: ['B97', 'B98'],
    population: 87000,
    areaType: 'town',
    intro:
      'Market town on the edge of the Arrow Valley, with strong transport links and a cluster of rural country-house wedding venues in the surrounding Worcestershire/Warwickshire borderlands.',
    nearbyAreas: [
      { name: 'Bromsgrove', slug: 'bromsgrove' },
      { name: 'Alcester', slug: 'alcester' },
      { name: 'Stratford-upon-Avon', slug: 'stratford-upon-avon' },
      { name: 'Solihull', slug: 'solihull' },
    ],
  },
  {
    slug: 'kidderminster',
    name: 'Kidderminster',
    county: 'Worcestershire',
    countySlug: 'worcestershire',
    postcodes: ['DY10', 'DY11', 'DY14'],
    population: 57000,
    areaType: 'town',
    intro:
      'Kidderminster sits in the north of Worcestershire, close to the Wyre Forest and the Severn Valley. Wedding venues nearby range from restored country houses to riverside hotels and rustic barns.',
    nearbyAreas: [
      { name: 'Bewdley', slug: 'bewdley' },
      { name: 'Stourport-on-Severn', slug: 'stourport-on-severn' },
      { name: 'Hagley', slug: 'hagley' },
      { name: 'Bromsgrove', slug: 'bromsgrove' },
    ],
  },
  {
    slug: 'bromsgrove',
    name: 'Bromsgrove',
    county: 'Worcestershire',
    countySlug: 'worcestershire',
    postcodes: ['B60', 'B61'],
    population: 34000,
    areaType: 'town',
    intro:
      'North Worcestershire market town on the edge of the Lickey Hills. Great wedding venue reach — the Vale of Evesham, the Malverns, south Birmingham and the Warwickshire border are all inside half an hour.',
    nearbyAreas: [
      { name: 'Catshill', slug: 'catshill' },
      { name: 'Redditch', slug: 'redditch' },
      { name: 'Droitwich Spa', slug: 'droitwich-spa' },
      { name: 'Hagley', slug: 'hagley' },
    ],
  },
  {
    slug: 'malvern',
    name: 'Malvern',
    county: 'Worcestershire',
    countySlug: 'worcestershire',
    postcodes: ['WR13', 'WR14'],
    population: 30000,
    areaType: 'town',
    intro:
      'Elegant Victorian spa town in the shadow of the Malvern Hills. The views alone make it one of the most photographed wedding backdrops in the county, with country houses and hilltop hotels to match.',
    nearbyAreas: [
      { name: 'Worcester', slug: 'worcester' },
      { name: 'Ledbury', slug: 'ledbury' },
      { name: 'Pershore', slug: 'pershore' },
      { name: 'Tewkesbury', slug: 'tewkesbury' },
    ],
    nearbyVenues: ['eastnor-castle'],
  },
  {
    slug: 'evesham',
    name: 'Evesham',
    county: 'Worcestershire',
    countySlug: 'worcestershire',
    postcodes: ['WR11'],
    population: 24000,
    areaType: 'town',
    intro:
      'Riverside market town at the heart of the Vale of Evesham. Orchards, Cotswold villages and country-house venues surround the town on every side — a strong choice for couples who want rural without isolated.',
    nearbyAreas: [
      { name: 'Pershore', slug: 'pershore' },
      { name: 'Broadway (Cotswolds)', slug: 'cotswolds' },
      { name: 'Stratford-upon-Avon', slug: 'stratford-upon-avon' },
      { name: 'Worcester', slug: 'worcester' },
    ],
  },
  {
    slug: 'droitwich-spa',
    name: 'Droitwich Spa',
    county: 'Worcestershire',
    countySlug: 'worcestershire',
    postcodes: ['WR9'],
    population: 25000,
    areaType: 'town',
    intro:
      'Historic spa town between Worcester and Bromsgrove. A compact centre with good hotel and country-house wedding options nearby, plus excellent reach into the surrounding county.',
    nearbyAreas: [
      { name: 'Worcester', slug: 'worcester' },
      { name: 'Bromsgrove', slug: 'bromsgrove' },
      { name: 'Redditch', slug: 'redditch' },
      { name: 'Kidderminster', slug: 'kidderminster' },
    ],
  },
  {
    slug: 'stourport-on-severn',
    name: 'Stourport-on-Severn',
    county: 'Worcestershire',
    countySlug: 'worcestershire',
    postcodes: ['DY13'],
    population: 20000,
    areaType: 'town',
    intro:
      'Georgian canal town at the confluence of the Stour and the Severn. Riverside venues, canal-side pubs and country houses in the surrounding Wyre Forest give couples plenty of distinctive options.',
    nearbyAreas: [
      { name: 'Bewdley', slug: 'bewdley' },
      { name: 'Kidderminster', slug: 'kidderminster' },
      { name: 'Worcester', slug: 'worcester' },
      { name: 'Bridgnorth', slug: 'bridgnorth' },
    ],
  },
  {
    slug: 'catshill',
    name: 'Catshill',
    county: 'Worcestershire',
    countySlug: 'worcestershire',
    postcodes: ['B61'],
    population: 8000,
    areaType: 'village',
    intro:
      'Village on the northern edge of Bromsgrove, well placed for country-house weddings across north Worcestershire and the south Birmingham border.',
    nearbyAreas: [
      { name: 'Bromsgrove', slug: 'bromsgrove' },
      { name: 'Hagley', slug: 'hagley' },
      { name: 'Hollywood', slug: 'hollywood' },
      { name: 'Redditch', slug: 'redditch' },
    ],
  },
  {
    slug: 'bewdley',
    name: 'Bewdley',
    county: 'Worcestershire',
    countySlug: 'worcestershire',
    postcodes: ['DY12'],
    population: 10000,
    areaType: 'town',
    intro:
      'Picturesque Georgian town on the River Severn at the edge of the Wyre Forest. The kind of place where the wedding begins on a riverside terrace and ends in a country-house ballroom.',
    nearbyAreas: [
      { name: 'Kidderminster', slug: 'kidderminster' },
      { name: 'Stourport-on-Severn', slug: 'stourport-on-severn' },
      { name: 'Bridgnorth', slug: 'bridgnorth' },
      { name: 'Worcester', slug: 'worcester' },
    ],
  },
  {
    slug: 'pershore',
    name: 'Pershore',
    county: 'Worcestershire',
    countySlug: 'worcestershire',
    postcodes: ['WR10'],
    population: 7000,
    areaType: 'town',
    intro:
      'Georgian market town and abbey centre in the Vale of Evesham. Small-scale country-house and barn wedding venues are scattered across the surrounding orchards and villages.',
    nearbyAreas: [
      { name: 'Evesham', slug: 'evesham' },
      { name: 'Worcester', slug: 'worcester' },
      { name: 'Malvern', slug: 'malvern' },
      { name: 'Tewkesbury', slug: 'tewkesbury' },
    ],
  },
  {
    slug: 'hagley',
    name: 'Hagley',
    county: 'Worcestershire',
    countySlug: 'worcestershire',
    postcodes: ['DY9'],
    population: 6500,
    areaType: 'village',
    intro:
      'Sought-after commuter village below the Clent Hills, with Hagley Hall and a cluster of country-house venues within easy reach. The north-Worcestershire border with the West Midlands in one well-connected spot.',
    nearbyAreas: [
      { name: 'Stourbridge', slug: 'stourbridge' },
      { name: 'Kidderminster', slug: 'kidderminster' },
      { name: 'Bromsgrove', slug: 'bromsgrove' },
      { name: 'Halesowen', slug: 'halesowen' },
    ],
  },
  {
    slug: 'hollywood',
    name: 'Hollywood',
    county: 'Worcestershire',
    countySlug: 'worcestershire',
    postcodes: ['B47'],
    population: 8000,
    areaType: 'village',
    intro:
      'Village on the south Birmingham border, neatly positioned for weddings across north Worcestershire, Solihull and the city\'s southern suburbs.',
    nearbyAreas: [
      { name: 'Solihull', slug: 'solihull' },
      { name: 'Redditch', slug: 'redditch' },
      { name: 'Bromsgrove', slug: 'bromsgrove' },
      { name: 'Birmingham', slug: 'birmingham' },
    ],
  },

  // Herefordshire towns
  {
    slug: 'hereford',
    name: 'Hereford',
    county: 'Herefordshire',
    countySlug: 'herefordshire',
    postcodes: ['HR1', 'HR2', 'HR3', 'HR4'],
    population: 61000,
    areaType: 'city',
    intro:
      'Cathedral city on the River Wye, with Norman architecture, riverside meadows, and a mix of city-centre hotel and rural country-house wedding venues across the surrounding countryside.',
    nearbyAreas: [
      { name: 'Leominster', slug: 'leominster' },
      { name: 'Ross-on-Wye', slug: 'ross-on-wye' },
      { name: 'Ledbury', slug: 'ledbury' },
      { name: 'Herefordshire', slug: 'herefordshire' },
    ],
    nearbyVenues: ['eastnor-castle'],
  },
  {
    slug: 'leominster',
    name: 'Leominster',
    county: 'Herefordshire',
    countySlug: 'herefordshire',
    postcodes: ['HR6'],
    population: 11000,
    areaType: 'town',
    intro:
      'Medieval wool town in north Herefordshire. Black-and-white villages, timbered country houses and farm barn venues define the wedding scene in this corner of the county.',
    nearbyAreas: [
      { name: 'Hereford', slug: 'hereford' },
      { name: 'Ludlow', slug: 'ludlow' },
      { name: 'Bromsgrove', slug: 'bromsgrove' },
      { name: 'Herefordshire', slug: 'herefordshire' },
    ],
  },
  {
    slug: 'ross-on-wye',
    name: 'Ross-on-Wye',
    county: 'Herefordshire',
    countySlug: 'herefordshire',
    postcodes: ['HR9'],
    population: 11000,
    areaType: 'town',
    intro:
      'Market town perched above a horseshoe bend of the River Wye. Wye Valley views, riverside venues and country estates on the Forest of Dean border make it one of the most atmospheric corners of the Welsh Marches.',
    nearbyAreas: [
      { name: 'Hereford', slug: 'hereford' },
      { name: 'Ledbury', slug: 'ledbury' },
      { name: 'Lydney', slug: 'lydney' },
      { name: 'Coleford', slug: 'coleford' },
    ],
  },
  {
    slug: 'ledbury',
    name: 'Ledbury',
    county: 'Herefordshire',
    countySlug: 'herefordshire',
    postcodes: ['HR8'],
    population: 10000,
    areaType: 'town',
    intro:
      'Timber-framed market town between the Malverns and the Welsh border. Home of Eastnor Castle and a cluster of country-house wedding venues, with straightforward road connections to Worcester, Gloucester and Hereford.',
    nearbyAreas: [
      { name: 'Malvern', slug: 'malvern' },
      { name: 'Hereford', slug: 'hereford' },
      { name: 'Ross-on-Wye', slug: 'ross-on-wye' },
      { name: 'Tewkesbury', slug: 'tewkesbury' },
    ],
    nearbyVenues: ['eastnor-castle'],
  },

  // Gloucestershire towns
  {
    slug: 'gloucester',
    name: 'Gloucester',
    county: 'Gloucestershire',
    countySlug: 'gloucestershire',
    postcodes: ['GL1', 'GL2', 'GL3', 'GL4'],
    population: 132000,
    areaType: 'city',
    intro:
      'Cathedral city on the River Severn, with Roman origins, Tudor streets and a steadily growing wedding venue offering from city-centre hotels to converted docks and country estates.',
    nearbyAreas: [
      { name: 'Cheltenham', slug: 'cheltenham' },
      { name: 'Stroud', slug: 'stroud' },
      { name: 'Tewkesbury', slug: 'tewkesbury' },
      { name: 'Coleford', slug: 'coleford' },
    ],
  },
  {
    slug: 'cheltenham',
    name: 'Cheltenham',
    county: 'Gloucestershire',
    countySlug: 'gloucestershire',
    postcodes: ['GL50', 'GL51', 'GL52', 'GL53'],
    population: 117000,
    areaType: 'town',
    intro:
      'Regency spa town on the edge of the Cotswolds, famed for its festivals, grand squares and stately hotels. Cheltenham has one of the strongest wedding venue concentrations in the West.',
    nearbyAreas: [
      { name: 'Gloucester', slug: 'gloucester' },
      { name: 'Tewkesbury', slug: 'tewkesbury' },
      { name: 'Cirencester', slug: 'cirencester' },
      { name: 'Stroud', slug: 'stroud' },
    ],
  },
  {
    slug: 'stroud',
    name: 'Stroud',
    county: 'Gloucestershire',
    countySlug: 'gloucestershire',
    postcodes: ['GL5', 'GL6'],
    population: 35000,
    areaType: 'town',
    intro:
      'Victorian mill town in the Stroud valleys, on the south-western edge of the Cotswolds. Wedding venues range from converted mills to country-house estates and rustic barns.',
    nearbyAreas: [
      { name: 'Gloucester', slug: 'gloucester' },
      { name: 'Cheltenham', slug: 'cheltenham' },
      { name: 'Cirencester', slug: 'cirencester' },
      { name: 'Tewkesbury', slug: 'tewkesbury' },
    ],
  },
  {
    slug: 'tewkesbury',
    name: 'Tewkesbury',
    county: 'Gloucestershire',
    countySlug: 'gloucestershire',
    postcodes: ['GL20'],
    population: 20000,
    areaType: 'town',
    intro:
      'Medieval market town at the confluence of the Severn and Avon, with its huge Norman abbey as a centrepiece. The Vale and the Cotswolds meet here, giving wedding couples a wide mix of venue styles inside a short drive.',
    nearbyAreas: [
      { name: 'Cheltenham', slug: 'cheltenham' },
      { name: 'Gloucester', slug: 'gloucester' },
      { name: 'Malvern', slug: 'malvern' },
      { name: 'Evesham', slug: 'evesham' },
    ],
  },
  {
    slug: 'cirencester',
    name: 'Cirencester',
    county: 'Gloucestershire',
    countySlug: 'gloucestershire',
    postcodes: ['GL7'],
    population: 20000,
    areaType: 'town',
    intro:
      'The capital of the Cotswolds, with Roman origins, honey-stone streets, and a dense scattering of country-house, barn and estate wedding venues across the surrounding Cotswolds AONB.',
    nearbyAreas: [
      { name: 'Cheltenham', slug: 'cheltenham' },
      { name: 'Cotswolds', slug: 'cotswolds' },
      { name: 'Stroud', slug: 'stroud' },
      { name: 'Tewkesbury', slug: 'tewkesbury' },
    ],
  },
  {
    slug: 'coleford',
    name: 'Coleford',
    county: 'Gloucestershire',
    countySlug: 'gloucestershire',
    postcodes: ['GL16'],
    population: 8000,
    areaType: 'town',
    intro:
      'Small Forest of Dean market town, surrounded by oak woodland, limestone outcrops and some genuinely distinctive forest-edge wedding venues.',
    nearbyAreas: [
      { name: 'Lydney', slug: 'lydney' },
      { name: 'Ross-on-Wye', slug: 'ross-on-wye' },
      { name: 'Gloucester', slug: 'gloucester' },
      { name: 'Cirencester', slug: 'cirencester' },
    ],
  },
  {
    slug: 'lydney',
    name: 'Lydney',
    county: 'Gloucestershire',
    countySlug: 'gloucestershire',
    postcodes: ['GL15'],
    population: 9000,
    areaType: 'town',
    intro:
      'Severn-side market town on the edge of the Forest of Dean, with estuary views and quiet rural wedding venues across the forest and valley above.',
    nearbyAreas: [
      { name: 'Coleford', slug: 'coleford' },
      { name: 'Ross-on-Wye', slug: 'ross-on-wye' },
      { name: 'Gloucester', slug: 'gloucester' },
      { name: 'Stroud', slug: 'stroud' },
    ],
  },

  // West Midlands towns
  {
    slug: 'birmingham',
    name: 'Birmingham',
    county: 'West Midlands',
    countySlug: 'west-midlands',
    postcodes: ['B1', 'B2', 'B3', 'B4', 'B5', 'B15'],
    population: 1150000,
    areaType: 'city',
    intro:
      'The UK\'s second city — wedding venues here span Victorian mansions in Edgbaston, luxury hotels in the city centre, canal-side warehouses in the Jewellery Quarter and contemporary spaces in Digbeth.',
    nearbyAreas: [
      { name: 'Solihull', slug: 'solihull' },
      { name: 'Halesowen', slug: 'halesowen' },
      { name: 'Wolverhampton', slug: 'wolverhampton' },
      { name: 'Smethwick', slug: 'smethwick' },
    ],
  },
  {
    slug: 'solihull',
    name: 'Solihull',
    county: 'West Midlands',
    countySlug: 'west-midlands',
    postcodes: ['B90', 'B91', 'B92', 'B93', 'B94'],
    population: 215000,
    areaType: 'town',
    intro:
      'Leafy Birmingham-border town with one of the most affluent wedding venue selections in the region — country houses, golf-resort hotels and a handful of period-style venues within a short radius.',
    nearbyAreas: [
      { name: 'Birmingham', slug: 'birmingham' },
      { name: 'Warwick', slug: 'warwick' },
      { name: 'Royal Leamington Spa', slug: 'royal-leamington-spa' },
      { name: 'Redditch', slug: 'redditch' },
    ],
  },
  {
    slug: 'wolverhampton',
    name: 'Wolverhampton',
    county: 'West Midlands',
    countySlug: 'west-midlands',
    postcodes: ['WV1', 'WV2', 'WV3', 'WV4', 'WV5', 'WV6'],
    population: 264000,
    areaType: 'city',
    intro:
      'City at the heart of the Black Country, with Victorian industrial architecture, Georgian corners, and a wedding venue scene that spans city-centre hotels, sports grounds and country-house estates just outside town.',
    nearbyAreas: [
      { name: 'Dudley', slug: 'dudley' },
      { name: 'Stourbridge', slug: 'stourbridge' },
      { name: 'Cannock', slug: 'cannock' },
      { name: 'Telford', slug: 'telford' },
    ],
  },
  {
    slug: 'dudley',
    name: 'Dudley',
    county: 'West Midlands',
    countySlug: 'west-midlands',
    postcodes: ['DY1', 'DY2', 'DY3'],
    population: 80000,
    areaType: 'town',
    intro:
      'Historic Black Country town with a Norman castle at its centre. Compact wedding offering in town and strong country-house options in the surrounding villages and hills.',
    nearbyAreas: [
      { name: 'Stourbridge', slug: 'stourbridge' },
      { name: 'Halesowen', slug: 'halesowen' },
      { name: 'Wolverhampton', slug: 'wolverhampton' },
      { name: 'Kidderminster', slug: 'kidderminster' },
    ],
  },
  {
    slug: 'stourbridge',
    name: 'Stourbridge',
    county: 'West Midlands',
    countySlug: 'west-midlands',
    postcodes: ['DY7', 'DY8'],
    population: 64000,
    areaType: 'town',
    intro:
      'Glassmaking town on the edge of the Black Country, well placed for country-house weddings in the Clent Hills, north Worcestershire and the south-Birmingham border.',
    nearbyAreas: [
      { name: 'Hagley', slug: 'hagley' },
      { name: 'Halesowen', slug: 'halesowen' },
      { name: 'Dudley', slug: 'dudley' },
      { name: 'Kidderminster', slug: 'kidderminster' },
    ],
  },
  {
    slug: 'halesowen',
    name: 'Halesowen',
    county: 'West Midlands',
    countySlug: 'west-midlands',
    postcodes: ['B62', 'B63'],
    population: 58000,
    areaType: 'town',
    intro:
      'On the south-west edge of Birmingham, with good access to country-house and golf-resort wedding venues across the Clent Hills and Worcestershire border.',
    nearbyAreas: [
      { name: 'Birmingham', slug: 'birmingham' },
      { name: 'Stourbridge', slug: 'stourbridge' },
      { name: 'Hagley', slug: 'hagley' },
      { name: 'Dudley', slug: 'dudley' },
    ],
  },
  {
    slug: 'smethwick',
    name: 'Smethwick',
    county: 'West Midlands',
    countySlug: 'west-midlands',
    postcodes: ['B66', 'B67'],
    population: 65000,
    areaType: 'town',
    intro:
      'Sandwell town on the western edge of Birmingham, with the city\'s full venue catalogue — hotels, mansions, Jewellery Quarter spaces, stadium suites — all a short drive away.',
    nearbyAreas: [
      { name: 'Birmingham', slug: 'birmingham' },
      { name: 'Dudley', slug: 'dudley' },
      { name: 'Wolverhampton', slug: 'wolverhampton' },
      { name: 'Solihull', slug: 'solihull' },
    ],
  },

  // Warwickshire towns
  {
    slug: 'stratford-upon-avon',
    name: 'Stratford-upon-Avon',
    county: 'Warwickshire',
    countySlug: 'warwickshire',
    postcodes: ['CV37'],
    population: 31000,
    areaType: 'town',
    intro:
      'Shakespeare\'s hometown on the Warwickshire Avon. Tudor and Elizabethan venues, riverside hotels, and country estates in the surrounding countryside make it one of the most-booked wedding towns in the region.',
    nearbyAreas: [
      { name: 'Warwick', slug: 'warwick' },
      { name: 'Royal Leamington Spa', slug: 'royal-leamington-spa' },
      { name: 'Alcester', slug: 'alcester' },
      { name: 'Evesham', slug: 'evesham' },
    ],
  },
  {
    slug: 'warwick',
    name: 'Warwick',
    county: 'Warwickshire',
    countySlug: 'warwickshire',
    postcodes: ['CV34', 'CV35'],
    population: 35000,
    areaType: 'town',
    intro:
      'County town built around a 14th-century castle. Weddings here lean grand and historic — Warwick Castle itself, period hotels and country estates nearby.',
    nearbyAreas: [
      { name: 'Royal Leamington Spa', slug: 'royal-leamington-spa' },
      { name: 'Stratford-upon-Avon', slug: 'stratford-upon-avon' },
      { name: 'Solihull', slug: 'solihull' },
      { name: 'Rugby', slug: 'rugby' },
    ],
  },
  {
    slug: 'royal-leamington-spa',
    name: 'Royal Leamington Spa',
    county: 'Warwickshire',
    countySlug: 'warwickshire',
    postcodes: ['CV31', 'CV32'],
    population: 50000,
    areaType: 'town',
    intro:
      'Regency spa town beside Warwick, with pale-stucco Georgian terraces, formal gardens and a refined wedding venue scene of period hotels and country houses.',
    nearbyAreas: [
      { name: 'Warwick', slug: 'warwick' },
      { name: 'Stratford-upon-Avon', slug: 'stratford-upon-avon' },
      { name: 'Solihull', slug: 'solihull' },
      { name: 'Rugby', slug: 'rugby' },
    ],
  },
  {
    slug: 'nuneaton',
    name: 'Nuneaton',
    county: 'Warwickshire',
    countySlug: 'warwickshire',
    postcodes: ['CV10', 'CV11'],
    population: 87000,
    areaType: 'town',
    intro:
      'North Warwickshire market town, home to George Eliot. Well connected for country-house wedding venues across the Warwickshire/Leicestershire border.',
    nearbyAreas: [
      { name: 'Rugby', slug: 'rugby' },
      { name: 'Solihull', slug: 'solihull' },
      { name: 'Warwick', slug: 'warwick' },
      { name: 'Lichfield', slug: 'lichfield' },
    ],
  },
  {
    slug: 'rugby',
    name: 'Rugby',
    county: 'Warwickshire',
    countySlug: 'warwickshire',
    postcodes: ['CV21', 'CV22', 'CV23'],
    population: 78000,
    areaType: 'town',
    intro:
      'Market town on the Warwickshire/Northamptonshire border, with good reach into the Cotswolds and Leicestershire country-house wedding scenes.',
    nearbyAreas: [
      { name: 'Warwick', slug: 'warwick' },
      { name: 'Nuneaton', slug: 'nuneaton' },
      { name: 'Royal Leamington Spa', slug: 'royal-leamington-spa' },
      { name: 'Solihull', slug: 'solihull' },
    ],
  },
  {
    slug: 'alcester',
    name: 'Alcester',
    county: 'Warwickshire',
    countySlug: 'warwickshire',
    postcodes: ['B49', 'B50'],
    population: 6500,
    areaType: 'town',
    intro:
      'Roman market town at the Warwickshire/Worcestershire border, surrounded by Cotswold-edge villages and small-scale country wedding venues.',
    nearbyAreas: [
      { name: 'Stratford-upon-Avon', slug: 'stratford-upon-avon' },
      { name: 'Redditch', slug: 'redditch' },
      { name: 'Evesham', slug: 'evesham' },
      { name: 'Warwick', slug: 'warwick' },
    ],
  },

  // Shropshire towns
  {
    slug: 'shrewsbury',
    name: 'Shrewsbury',
    county: 'Shropshire',
    countySlug: 'shropshire',
    postcodes: ['SY1', 'SY2', 'SY3'],
    population: 72000,
    areaType: 'town',
    intro:
      'Medieval market town on a River Severn loop, with a Tudor and Georgian core. Country-house and estate wedding venues are scattered across the surrounding Shropshire countryside.',
    nearbyAreas: [
      { name: 'Telford', slug: 'telford' },
      { name: 'Ludlow', slug: 'ludlow' },
      { name: 'Bridgnorth', slug: 'bridgnorth' },
      { name: 'Shropshire', slug: 'shropshire' },
    ],
  },
  {
    slug: 'bridgnorth',
    name: 'Bridgnorth',
    county: 'Shropshire',
    countySlug: 'shropshire',
    postcodes: ['WV15', 'WV16'],
    population: 12000,
    areaType: 'town',
    intro:
      'Dramatic two-tier town straddling the Severn Gorge. Period hotels, country houses and barn venues along the river give it a disproportionately strong wedding scene for its size.',
    nearbyAreas: [
      { name: 'Shrewsbury', slug: 'shrewsbury' },
      { name: 'Telford', slug: 'telford' },
      { name: 'Ludlow', slug: 'ludlow' },
      { name: 'Stourbridge', slug: 'stourbridge' },
    ],
  },
  {
    slug: 'ludlow',
    name: 'Ludlow',
    county: 'Shropshire',
    countySlug: 'shropshire',
    postcodes: ['SY8'],
    population: 11000,
    areaType: 'town',
    intro:
      'Market town built around a Norman castle and a cluster of black-and-white timbered streets. A particular favourite for food-focused weddings, with top-class country-house venues in the surrounding hills.',
    nearbyAreas: [
      { name: 'Leominster', slug: 'leominster' },
      { name: 'Shrewsbury', slug: 'shrewsbury' },
      { name: 'Bridgnorth', slug: 'bridgnorth' },
      { name: 'Hereford', slug: 'hereford' },
    ],
  },
  {
    slug: 'telford',
    name: 'Telford',
    county: 'Shropshire',
    countySlug: 'shropshire',
    postcodes: ['TF1', 'TF2', 'TF3', 'TF4', 'TF5', 'TF6', 'TF7'],
    population: 170000,
    areaType: 'town',
    intro:
      'New town around the Ironbridge Gorge World Heritage Site, with modern hotel venues in Telford itself and period, industrial-heritage options around Ironbridge.',
    nearbyAreas: [
      { name: 'Shrewsbury', slug: 'shrewsbury' },
      { name: 'Bridgnorth', slug: 'bridgnorth' },
      { name: 'Wolverhampton', slug: 'wolverhampton' },
      { name: 'Stafford', slug: 'stafford' },
    ],
  },

  // Staffordshire towns
  {
    slug: 'stafford',
    name: 'Stafford',
    county: 'Staffordshire',
    countySlug: 'staffordshire',
    postcodes: ['ST16', 'ST17', 'ST18'],
    population: 70000,
    areaType: 'town',
    intro:
      'County town of Staffordshire, with a Norman castle, medieval streets, and a spread of country-house wedding venues across the surrounding estate lands.',
    nearbyAreas: [
      { name: 'Cannock', slug: 'cannock' },
      { name: 'Lichfield', slug: 'lichfield' },
      { name: 'Telford', slug: 'telford' },
      { name: 'Wolverhampton', slug: 'wolverhampton' },
    ],
  },
  {
    slug: 'cannock',
    name: 'Cannock',
    county: 'Staffordshire',
    countySlug: 'staffordshire',
    postcodes: ['WS11', 'WS12'],
    population: 30000,
    areaType: 'town',
    intro:
      'Market town on the edge of Cannock Chase AONB, with forest-edge and country-house wedding venues in the heath and woodland surrounding it.',
    nearbyAreas: [
      { name: 'Stafford', slug: 'stafford' },
      { name: 'Lichfield', slug: 'lichfield' },
      { name: 'Wolverhampton', slug: 'wolverhampton' },
      { name: 'Burton upon Trent', slug: 'burton-upon-trent' },
    ],
  },
  {
    slug: 'lichfield',
    name: 'Lichfield',
    county: 'Staffordshire',
    countySlug: 'staffordshire',
    postcodes: ['WS13', 'WS14'],
    population: 33000,
    areaType: 'city',
    intro:
      'Cathedral city with a three-spired Gothic cathedral and Georgian centre. Small in population but strong in atmospheric venues — cathedral, period hotels and surrounding country houses.',
    nearbyAreas: [
      { name: 'Cannock', slug: 'cannock' },
      { name: 'Stafford', slug: 'stafford' },
      { name: 'Burton upon Trent', slug: 'burton-upon-trent' },
      { name: 'Nuneaton', slug: 'nuneaton' },
    ],
  },
  {
    slug: 'burton-upon-trent',
    name: 'Burton upon Trent',
    county: 'Staffordshire',
    countySlug: 'staffordshire',
    postcodes: ['DE13', 'DE14', 'DE15'],
    population: 75000,
    areaType: 'town',
    intro:
      'Brewing town on the River Trent, with industrial-heritage and country-house wedding venues in the surrounding East Staffordshire/South Derbyshire countryside.',
    nearbyAreas: [
      { name: 'Lichfield', slug: 'lichfield' },
      { name: 'Cannock', slug: 'cannock' },
      { name: 'Stafford', slug: 'stafford' },
      { name: 'Nuneaton', slug: 'nuneaton' },
    ],
  },
];

export const areas = rawAreas.map((a, i) => ({
  heroImage: heroFor(a.slug, i),
  ...a,
}));

export function getAreaBySlug(slug) {
  return areas.find((a) => a.slug === slug);
}

export function listAreas() {
  return areas.map(({ slug, name, county, countySlug }) => ({ slug, name, county, countySlug }));
}
