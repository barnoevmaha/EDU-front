// Bir necha joyda kerak bo'ladigan kichik funksiyalar.

export function roleLabel(role) {
  if (role === 'teacher') return 'Ustoz'
  if (role === 'admin') return 'Admin'
  return "O'quvchi"
}

export function statusLabel(user) {
  if (!user) return ''
  if (user.role !== 'student') return roleLabel(user.role)
  return user.status === 'student' ? "O'quvchi" : 'Tomoshabin'
}

export function initials(name = '') {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

// Tanlangan faylni brauzerda base64 ko'rinishiga o'giramiz.
// Shunday qilsak rasmni to'g'ridan-to'g'ri serverga matn sifatida yuborsak bo'ladi.
export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error("Faylni o'qib bo'lmadi"))
    reader.readAsDataURL(file)
  })
}
