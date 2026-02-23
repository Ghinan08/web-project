import React from 'react';
import './Team.css'; 

const teamMembers = [
  // --- TIM INTI ---
  {
    id: 1,
    name: 'Nama1',
    profession: 'Founder & CEO',
    domicile: 'Bandung, Jawa Barat',
    category: 'inti',
    image: '/img/5.jpeg',
  },
  {
    id: 2,
    name: 'Nama2',
    profession: 'Head of Programs',
    domicile: 'Jakarta Selatan',
    category: 'inti',
    image: '/img/4.jpeg',
  },
  {
    id: 3,
    name: 'Nama3',
    profession: 'Public Relations',
    domicile: 'Yogyakarta',
    category: 'inti',
    image: '/img/2.jpeg',
  },
  
  // --- TIM REGIONAL ---
  {
    id: 4,
    name: 'Nama4',
    profession: 'Bidang Backend',
    domicile: 'Surabaya',
    category: 'regional',
    image: '/img/1.jpeg',
  },
  {
    id: 5,
    name: 'Nama5',
    profession: 'Bidang frontend',
    domicile: 'Malang',
    category: 'regional',
    image: '/img/3.jpeg',
  }
  
];

const Team = () => {
  const timInti = teamMembers.filter(member => member.category === 'inti');
  const timRegional = teamMembers.filter(member => member.category === 'regional');

  const renderCards = (members) => (
    <div className="card-list">
      {members.map((member) => (
        <div className="card-item" key={member.id}>
          <div className="card-img-header">
              <img src={member.image} alt={member.name} className="user-image" />
          </div>
          <div className="card-content">
              <h3 className="user-name">{member.name}</h3>
              <p className="user-profession">{member.profession}</p>
              <p className="user-domicile"> {member.domicile}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="team-page">
      <section className="team-header text-center">
        <h1>Tim Sankara</h1>
        <p>Orang-orang hebat di balik layar yang berdedikasi untuk perubahan nyata.</p>
      </section>

      <div className="container team-content-wrapper">
        
        {/* Kategori 1: Tim Inti */}
        <div className="team-category">
            <h2 className="category-title">Tim Inti Pusat</h2>
            {renderCards(timInti)}
        </div>

        {/* Kategori 2: Tim Regional */}
        <div className="team-category" style={{marginTop: '80px'}}>
            <h2 className="category-title">Koordinator Regional</h2>
            {renderCards(timRegional)}
        </div>

      </div>
    </div>
  );
};

export default Team;