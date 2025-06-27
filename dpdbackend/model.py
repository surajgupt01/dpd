from dbConnect import Base
from sqlalchemy import Column, Integer, String, UUID, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from uuid import uuid4
from datetime import datetime





class Feedback(Base):
    __tablename__ = 'feedback'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    employee_id = Column(UUID(as_uuid=True), ForeignKey("employees.id"))
    manager_id = Column(UUID(as_uuid=True), ForeignKey("managers.id"), nullable=True)
    
    category = Column(String)
    communication = Column(Text, nullable=False)
    skills = Column(Text, nullable=False)
    timeliness = Column(Text, nullable=False)
    teamwork = Column(Text, nullable=False)
    rating = Column(Integer)
    feedbacktype = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)
    feedback = Column(String)
    
    employee = relationship("Employee", back_populates="feedbacks")
    manager = relationship("Manager", back_populates="feedbacks")



class Employee(Base):
    __tablename__='employees'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    name = Column(String , nullable = False)
    team = Column(String)
    email = Column(String, nullable=False , unique = True)
    password = Column(String, nullable=False)
    salary = Column(Integer)  
    department = Column(String)
    feedbacks = relationship("Feedback", back_populates="employee")


  

class Manager(Base):
    __tablename__='managers'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    name = Column(String , nullable = False)
    team = Column(String)
    email = Column(String, nullable=False , unique = True)
    password = Column(String, nullable=False , unique = True)
    salary = Column(Integer)
    department = Column(String)
    feedbacks = relationship("Feedback", back_populates="manager")
  
    

