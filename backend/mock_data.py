from datetime import datetime, timedelta
import random
import json
from models import Session, Grant

# Sample data for grants with specific titles and descriptions
grant_templates = [
    # Technology Grants
    {
        'industry': 'Technology',
        'templates': [
            {'title': 'Digital Innovation Fund', 'description': 'Supporting businesses in developing innovative digital solutions and software applications.'},
            {'title': 'AI Research Grant', 'description': 'Funding for artificial intelligence and machine learning research projects.'},
            {'title': 'Cybersecurity Enhancement Grant', 'description': 'Supporting businesses in implementing advanced cybersecurity measures.'},
            {'title': 'Cloud Technology Adoption Fund', 'description': 'Helping businesses migrate to cloud-based solutions.'},
            {'title': 'IoT Development Grant', 'description': 'Supporting Internet of Things (IoT) project development and implementation.'}
        ]
    },
    # Healthcare Grants
    {
        'industry': 'Healthcare',
        'templates': [
            {'title': 'Medical Research Innovation Grant', 'description': 'Supporting innovative medical research and clinical trials.'},
            {'title': 'Healthcare Technology Fund', 'description': 'Funding for implementation of new healthcare technologies.'},
            {'title': 'Mental Health Services Grant', 'description': 'Supporting mental health service providers and initiatives.'},
            {'title': 'Telehealth Development Fund', 'description': 'Enabling healthcare providers to implement telehealth solutions.'},
            {'title': 'Medical Equipment Modernization Grant', 'description': 'Funding for upgrading medical equipment and facilities.'}
        ]
    },
    # Agriculture Grants
    {
        'industry': 'Agriculture',
        'templates': [
            {'title': 'Sustainable Farming Initiative', 'description': 'Supporting transition to sustainable agricultural practices.'},
            {'title': 'Agricultural Technology Grant', 'description': 'Funding for implementation of smart farming technologies.'},
            {'title': 'Farm Diversification Fund', 'description': 'Supporting farmers in diversifying their agricultural activities.'},
            {'title': 'Drought Resilience Grant', 'description': 'Helping farms implement drought-resistant measures.'},
            {'title': 'Organic Farming Transition Grant', 'description': 'Supporting transition to organic farming methods.'}
        ]
    },
    # Manufacturing Grants
    {
        'industry': 'Manufacturing',
        'templates': [
            {'title': 'Industry 4.0 Adoption Grant', 'description': 'Supporting implementation of Industry 4.0 technologies.'},
            {'title': 'Clean Manufacturing Fund', 'description': 'Supporting transition to environmentally friendly manufacturing processes.'},
            {'title': 'Manufacturing Automation Grant', 'description': 'Funding for automation and robotics implementation.'},
            {'title': 'Supply Chain Optimization Fund', 'description': 'Supporting improvements in manufacturing supply chains.'},
            {'title': 'Quality Certification Grant', 'description': 'Helping manufacturers obtain quality certifications.'}
        ]
    },
    # Education Grants
    {
        'industry': 'Education',
        'templates': [
            {'title': 'Digital Learning Innovation Fund', 'description': 'Supporting development of digital learning solutions.'},
            {'title': 'STEM Education Grant', 'description': 'Funding for STEM education programs and resources.'},
            {'title': 'Educational Technology Fund', 'description': 'Supporting implementation of educational technology.'},
            {'title': 'Teacher Training Grant', 'description': 'Funding for teacher professional development programs.'},
            {'title': 'Special Education Support Grant', 'description': 'Supporting special education programs and resources.'}
        ]
    },
    # Clean Energy Grants
    {
        'industry': 'Clean Energy',
        'templates': [
            {'title': 'Solar Energy Implementation Fund', 'description': 'Supporting installation of solar energy systems.'},
            {'title': 'Wind Power Development Grant', 'description': 'Funding for wind power project development.'},
            {'title': 'Energy Storage Innovation Grant', 'description': 'Supporting energy storage technology development.'},
            {'title': 'Green Hydrogen Initiative', 'description': 'Funding for green hydrogen projects and research.'},
            {'title': 'Energy Efficiency Grant', 'description': 'Supporting implementation of energy-efficient solutions.'}
        ]
    }
]

locations = ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania']
statuses = ['open', 'closed', 'upcoming']

def generate_mock_data():
    session = Session()
    
    # Clear existing data
    session.query(Grant).delete()
    
    # Generate grants for each industry
    for industry_group in grant_templates:
        industry = industry_group['industry']
        templates = industry_group['templates']
        
        for template in templates:
            # Generate three versions of each grant template with different statuses
            for status in statuses:
                # Generate random dates based on status
                today = datetime.now()
                if status == 'upcoming':
                    opening_date = today + timedelta(days=random.randint(10, 30))
                elif status == 'open':
                    opening_date = today - timedelta(days=random.randint(1, 10))
                else:  # closed
                    opening_date = today - timedelta(days=random.randint(60, 90))
                
                closing_date = opening_date + timedelta(days=random.randint(30, 90))
                
                # Create grant
                grant = Grant(
                    title=template['title'],
                    description=template['description'],
            status=status,
            opening_date=opening_date,
            closing_date=closing_date,
            funding_amount=random.randint(50000, 2000000),
            business_contribution_percentage=random.randint(20, 50),
            location=random.choice(locations),
            industry=industry,
            eligibility_criteria=json.dumps({
                "min_years_operation": random.randint(1, 5),
                "min_employees": random.randint(1, 50),
                "max_turnover": random.randint(1000000, 10000000)
            }),
            keywords=",".join(random.sample(['innovation', 'research', 'technology', 'growth', 
                                          'sustainability', 'digital', 'export', 'startup'], 3)),
            is_active=True
        )
        session.add(grant)
    
    session.commit()
    session.close()

if __name__ == "__main__":
    generate_mock_data()
