import type { Lifestyle } from './types';

export type LifestyleKey = 'Wretched' | 'Squalid' | 'Poor' | 'Modest' | 'Comfortable' | 'Wealthy' | 'Aristocratic';

export const LIFESTYLES: Record<LifestyleKey, Lifestyle> = {
    'Wretched': {
        name: 'Wretched',
        cost: '0 gp/day',
        description: 'Living in extreme poverty and squalor, often in ditches or ruins.',
        weaponQuality: 'Broken, scavenged, or improvised. Likely rusted or poorly maintained.',
        armorQuality: 'Tattered rags, maybe a piece of scavenged leather. Functionally non-existent.',
        clothingQuality: 'Filthy, torn rags. Barely functional as clothing.',
        hygieneQuality: 'Extremely poor. Likely covered in dirt, sores, and grime.',
        backgroundStyle: 'A background of desperation, begging, or scavenging from the fringes of society.'
    },
    'Squalid': {
        name: 'Squalid',
        cost: '1 sp/day',
        description: 'A step above wretched, living in extremely poor conditions with little to no comfort or cleanliness.',
        weaponQuality: 'Heavily used, notched, and possibly ill-fitting. Functional but ugly.',
        armorQuality: 'Patched and mismatched pieces of leather or hide. Barely qualifies as armor.',
        clothingQuality: 'Heavily patched, stained, and threadbare clothes.',
        hygieneQuality: 'Poor. Infrequent washing, matted hair, generally unkempt.',
        backgroundStyle: 'A history of hard, unskilled labor with little pay, possibly living in slums or shantytowns.'
    },
    'Poor': {
        name: 'Poor',
        cost: '2 sp/day',
        description: 'A modest but difficult existence, with simple food, basic shelter, and no luxuries.',
        weaponQuality: 'Standard, undecorated, and functional. Shows signs of frequent use and repair.',
        armorQuality: 'Basic leather or hide armor, perhaps a simple helmet. Clearly self-maintained.',
        clothingQuality: 'Simple, homespun clothes. Clean but worn and faded.',
        hygieneQuality: 'Basic. Clean enough to avoid disease, but without any refinement.',
        backgroundStyle: 'A background as a common farmer, miner, or other laborer with a consistent but meager income.'
    },
    'Modest': {
        name: 'Modest',
        cost: '1 gp/day',
        description: 'This lifestyle provides basic necessities, a small but clean home, and keeps a character from attracting unwanted attention.',
        weaponQuality: 'Well-maintained standard-issue weapons. Practical and reliable.',
        armorQuality: 'Standard leather or chainmail, kept in good repair.',
        clothingQuality: 'Sturdy, practical clothing suitable for a trade. Clean and mended.',
        hygieneQuality: 'Good. Regular bathing and grooming are part of their routine.',
        backgroundStyle: 'A skilled tradesperson, guard, or farmer with their own land. A life of work, but not of want.'
    },
    'Comfortable': {
        name: 'Comfortable',
        cost: '2 gp/day',
        description: 'Affording nicer clothing, easier equipment maintenance, and access to a private room at a fine inn or a small cottage.',
        weaponQuality: 'Masterwork quality, perhaps with minor decorative elements. Kept in excellent condition.',
        armorQuality: 'Well-fitted chainmail or scale. Clean and polished.',
        clothingQuality: 'Good quality fabrics, well-tailored, and fashionable for their station.',
        hygieneQuality: 'Excellent. Clean, well-groomed, possibly uses simple perfumes or oils.',
        backgroundStyle: 'A successful merchant, a master artisan, or a member of a minor noble house.'
    },
    'Wealthy': {
        name: 'Wealthy',
        cost: '4 gp/day',
        description: 'A luxurious lifestyle with high-quality lodging, a small staff, and access to goods and services beyond the average person\'s reach.',
        weaponQuality: 'Ornate, possibly with precious metal inlays. A work of art that is also deadly.',
        armorQuality: 'Custom-fitted, masterwork armor, possibly partial plate. May have guild marks or family crests.',
        clothingQuality: 'Fine silks and fabrics, intricate embroidery, and fashionable accessories.',
        hygieneQuality: 'Impeccable. Likely uses expensive soaps, perfumes, and has a very refined appearance.',
        backgroundStyle: 'A prominent guild leader, a powerful merchant, a landowner, or a courtier.'
    },
    'Aristocratic': {
        name: 'Aristocratic',
        cost: '10+ gp/day',
        description: 'A life of true luxury and power, living in large homes, associating with the most influential people, and enjoying the highest standards of living.',
        weaponQuality: 'Exceptional, custom-made weapons, possibly with a famous smith\'s mark or a minor enchantment.',
        armorQuality: 'Full plate armor of the highest quality, decorated with heraldry and intricate designs.',
        clothingQuality: 'The pinnacle of fashion, made from exotic materials and adorned with jewels.',
        hygieneQuality: 'Pristine. A level of cleanliness and grooming that speaks of immense leisure and resources.',
        backgroundStyle: 'High nobility, a ruler, or an individual of immense inherited wealth and power.'
    }
};