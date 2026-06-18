import React, { useCallback, useEffect, useState } from 'react';
import { getImageUrl } from '../../config/api';
import './TeamSection.css';

const owner = { name: 'Joe', role: 'Owner', image: 'team_joe.jpg' };

const team = [
    { name: 'Thomas', role: 'Sanctuary Team', image: 'team_thomas.jpg' },
    { name: 'Zako',   role: 'Sanctuary Team', image: 'team_zako.jpg' },
    { name: 'Fred & Sil', role: 'Sanctuary Team', image: 'fred_and_sil.jpg' },
    { name: 'Noem', role: 'Sanctuary Team', image: 'team_unknown1.jpg' },
    { name: 'Channa', role: 'Sanctuary Team', image: 'channa.jpg' },
    { name: 'Niko', role: 'Sanctuary Team', image: 'niko_staff.jpg' },
    { name: 'Thy', role: 'Sanctuary Team', image: 'thy.jpg' },
    { name: 'Tina', role: 'Sanctuary Team', image: 'tina.jpg' },
];

const allMembers = [owner, ...team].map((member) => ({
    ...member,
    bio: member.name === 'Joe'
        ? 'Joe is an Australian citizen who fell in love with Cambodia and chose to build a life here. Over time, he became the heart behind Kampot Dog Sanctuary and rescue work for vulnerable dogs.'
        : 'Coming soon.',
}));

const TeamSection = () => {
    const [selectedMemberIndex, setSelectedMemberIndex] = useState(null);

    const openMember = useCallback((memberIndex) => {
        setSelectedMemberIndex(memberIndex);
    }, []);

    const closeMember = useCallback(() => setSelectedMemberIndex(null), []);
    const showPrevMember = useCallback(() => {
        setSelectedMemberIndex((prev) => {
            if (prev === null) return prev;
            return (prev - 1 + allMembers.length) % allMembers.length;
        });
    }, []);
    const showNextMember = useCallback(() => {
        setSelectedMemberIndex((prev) => {
            if (prev === null) return prev;
            return (prev + 1) % allMembers.length;
        });
    }, []);

    const selectedMember = selectedMemberIndex === null ? null : allMembers[selectedMemberIndex];

    useEffect(() => {
        if (!selectedMember) return undefined;

        const handleKeydown = (event) => {
            if (event.key === 'Escape') {
                closeMember();
            } else if (event.key === 'ArrowLeft') {
                showPrevMember();
            } else if (event.key === 'ArrowRight') {
                showNextMember();
            }
        };

        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, [selectedMember, closeMember, showNextMember, showPrevMember]);

    return (
        <section className="team-section">
            <div className="team-inner">
                <div className="team-header">
                    <span className="team-eyebrow">The Humans Behind The Sanctuary</span>
                    <h2 className="team-title">Meet The Team</h2>
                    <div className="team-sub-copy">
                        <p className="team-sub">
                            This motley crew scoop poop, feed, wash, entertain, heal and love the dogs day in and day out.
                        </p>
                        <p className="team-sub">
                            Joe, the pack leader, would be lost without them. Their dedication keeps Kampot Dog Sanctuary running, backed by a supportive local and online community.
                        </p>
                        <p className="team-sub">
                            Join the K.D.S. Crew by following our YouTube channel or sponsoring from just $5 a month on Patreon. Thank you all &lt;3
                        </p>
                    </div>
                </div>

                <div className="team-owner-row">
                    <button
                        type="button"
                        className="team-card team-card--owner team-card-button"
                        onClick={() => openMember(0)}
                        aria-label={`Open profile for ${owner.name}`}
                    >
                        <div className="team-card-img-wrap">
                            <img src={getImageUrl(owner.image)} alt={owner.name} loading="lazy" />
                            <div className="team-card-shine" />
                        </div>
                        <div className="team-card-info">
                            <h3 className="team-card-name">{owner.name}</h3>
                            <span className="team-card-role team-card-role--owner">{owner.role}</span>
                        </div>
                    </button>
                </div>

                <div className="team-divider">
                    <span>The Team</span>
                </div>

                <div className="team-grid">
                    {team.map((member, i) => (
                        <button
                            type="button"
                            className={`team-card team-card-button team-card-button--${(i % 3) + 1}`}
                            key={i}
                            onClick={() => openMember(i + 1)}
                            aria-label={`Open profile for ${member.name}`}
                        >
                            <div className="team-card-img-wrap">
                                <img src={getImageUrl(member.image)} alt={member.name} loading="lazy" />
                                <div className="team-card-shine" />
                            </div>
                            <div className="team-card-info">
                                <h3 className="team-card-name">{member.name}</h3>
                                <span className="team-card-role">{member.role}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {selectedMember ? (
                <div
                    className="team-modal-overlay"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${selectedMember.name} profile`}
                    onClick={closeMember}
                >
                    <div className="team-modal" onClick={(event) => event.stopPropagation()}>
                        <button
                            type="button"
                            className="team-modal-nav team-modal-nav-prev"
                            aria-label="Previous team member"
                            onClick={showPrevMember}
                        >
                            &#8249;
                        </button>

                        <button
                            type="button"
                            className="team-modal-nav team-modal-nav-next"
                            aria-label="Next team member"
                            onClick={showNextMember}
                        >
                            &#8250;
                        </button>

                        <button
                            type="button"
                            className="team-modal-close"
                            aria-label="Close profile popup"
                            onClick={closeMember}
                        >
                            &times;
                        </button>
                        <div className="team-modal-image-wrap">
                            <img src={getImageUrl(selectedMember.image)} alt={selectedMember.name} />
                        </div>
                        <div className="team-modal-copy">
                            <span className="team-modal-role">{selectedMember.role}</span>
                            <h3>{selectedMember.name}</h3>
                            <p>{selectedMember.bio}</p>
                            <div className="team-modal-counter">
                                {selectedMemberIndex + 1} / {allMembers.length}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </section>
    );
};

export default TeamSection;
